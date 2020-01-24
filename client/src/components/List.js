import React, {Component} from 'react';
import axios from 'axios';
import Item from './listElems/Item';
import NewItem from './listElems/NewItem';
import EditItem from './listElems/EditItem';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            editingItemID: null,
        }

        this.addNewItem = this.addNewItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.editingItem = this.editingItem.bind(this);
        this.handleDragStart = this.props.handleDragStart;
        this.handleDragEnd = this.props.handleDragEnd;
        this.handleDragEnter = this.props.handleDragEnter;
        this.handleDragOver = this.props.handleDragOver;
        this.handleDrop = this.props.handleDrop;
        this.refreshPage = this.refreshPage.bind(this);
    }

    componentDidMount() {
        axios.get('/api/v1/items.json')
        .then(response => {
          console.log(response);
          const items = response.data.filter(item => {
            return(Number(item.listref) === this.props.list.id);
          });
          
          this.setState({items});
        })
        .catch(error => console.log(error));

        document.addEventListener('dragenter', this.handleDragEnter);
        document.addEventListener('dragover', this.handleDragOver);
        document.addEventListener('drop', this.handleDrop);
    }

    addNewItem(name, description) {
        const listref = this.props.list.id;
        axios.post('/api/v1/items', {item: {name, description, listref}})
        .then(response => {
            console.log(response)
            const items = [ ...this.state.items, response.data ]
            this.setState({items})
        })
        .catch(error => {
            console.log(error)
        })
    }

    removeItem(id) {
        axios.delete( '/api/v1/items/' + id )
        .then(response => {
            const items = this.state.items.filter(
                item => item.id !== id
            )
            this.setState({items})
        })
        .catch(error => console.log(error))
    }

    editItem(id, name, description) {
        axios.put('/api/v1/items/' + id, { 
            item: {
                name, 
                description
            } 
        })
        .then(response => {
            console.log(response);
            const items = this.state.items;
            for (let i = 0; i < items.length; i ++) {
                if (items[i].id === id) {
                    items[i] = {id, name, description};
                    break;
                } else {}
            }
            this.setState(() => ({
                items, 
                editingItemID: null
            }))
        })
        .catch(error => console.log(error));
    }

    editingItem(id) {
        this.setState({
            editingItemID: id
        })
    }

    refreshPage() {
        window.location.reload(false);
    }

    render() {
        const filteredItems = this.state.items.filter(item => {
            return (item.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
                || item.description.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1);
        });

        const itemsDisplay = filteredItems.map(item => {
            if ( this.state.editingItemID === item.id ) {
                return (<EditItem
                            item={item} 
                            key={item.id} 
                            editItem={this.editItem} 
                />);
            } else {
                return(<Item 
                    key = {item.name}
                    item = {item}
                    name = {item.name}
                    description = {item.description}
                    listref = {this.props.list.id}
                    onRemoveItem = {this.removeItem}
                    editingItem = {this.editingItem}
                    onDragStart = {this.handleDragStart}
                    onDragEnd = {this.handleDragEnd}
                />);
            }
        });

        return(
            <div className="list" 
                key={this.props.list.id}
                onDrop = {() => {this.handleDrop(this.props.list.id);
                    this.refreshPage();}}
            >
                <h4>{this.props.list.title}</h4>
                <p>{this.state.items.length} tasks</p>
                <button onClick={() => this.props.onRemoveList(this.props.list.id)}>Delete Category</button>
                <button onClick={() => this.props.editingList(this.props.list.id)}>Edit Category</button>
                <br />
                <NewItem onNewItem = {this.addNewItem} />
                {itemsDisplay}
            </div>
        );
    }
    
}

export default List;