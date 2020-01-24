import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import NewList from './NewList';
import EditList from './EditList';

class ListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            editingListId: null,
            search: '',
            draggedItem: null
        }

        this.addNewList = this.addNewList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.editList = this.editList.bind(this);
        this.editingList = this.editingList.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

    }

    componentDidMount() {
        axios.get('/api/v1/lists.json')
        .then(response => {
          console.log(response)
          this.setState({lists: response.data})
        })
        .catch(error => console.log(error))
    }

    addNewList(title) {
        axios.post('/api/v1/lists', { list: {title} })
        .then(response => {
            console.log(response)
            const lists = [ ...this.state.lists, response.data ]
            this.setState({lists})
        })
        .catch(error => {
            console.log(error)
        })
    }

    removeList(id) {
        axios.delete( '/api/v1/lists/' + id )
        .then(response => {
            const lists = this.state.lists.filter(
                list => list.id !== id
            )
            this.setState({lists})
        })
        .catch(error => console.log(error))
    }

    editList(id, title) {
        axios.put('/api/v1/lists/' + id, { 
            list: {
                title
            } 
        })
        .then(response => {
            console.log(response);
            const lists = this.state.lists;
            for (let i = 0; i < lists.length; i ++) {
                if (lists[i].id === id) {
                    lists[i] = {id, title};
                    break;
                } else {}
            }
            this.setState(() => ({
                lists, 
                editingListId: null
            }))
        })
        .catch(error => console.log(error));
    }

    editingList(id) {
        this.setState({
            editingListId: id
        });
    }

    updateSearch(e) {
        this.setState({
            search: e.target.value
        });
    }

    handleDragStart(item) {
        this.setState({draggedItem: item});
    }

    handleDragEnd() {
        this.setState({draggedItem: null});
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
    }

    handleDrop(listref) {
        axios.put('/api/v1/items/' + this.state.draggedItem.id, { 
            item: {
                name: this.state.draggedItem.name, 
                description: this.state.draggedItem.description,
                listref: listref
            } 
        });
    }

    render() {
    return (
        <div>
        <div className = "header">
            <h1>
                Your Productivity Suite
            </h1>
            <br />
            <p>to recategorize your tasks, simply drag and drop</p>
            <br />
            <input className = 'Input-field'
                placeholder = 'Search for tasks...' 
                onChange = {this.updateSearch}
            />
            <br />
            <NewList onNewList={this.addNewList} />
            <br />
        </div>
        <div className = "lists">
            {this.state.lists.map(list => {
                if (this.state.editingListId === list.id) {
                    return (<EditList
                        list={list} 
                        key={list.id} 
                        editList={this.editList} 
                        />);
                } else {
                    return (<List 
                        list={list} 
                        key={list.id}
                        search={this.state.search}
                        onRemoveList={this.removeList}
                        editingList={this.editingList}
                        handleDragStart={this.handleDragStart}
                        handleDragEnd={this.handleDragEnd}
                        handleDragEnter={this.handleDragEnter}
                        handleDragOver={this.handleDragOver}
                        handleDrop={this.handleDrop} 
                    />);
                }
        })
        }
        </div>
        </div>
    )
  }
}

export default ListContainer