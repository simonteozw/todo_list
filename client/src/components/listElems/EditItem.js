import React, { Component } from 'react';
class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.item.id,
            name: this.props.item.name,
            description: this.props.item.description
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        const {id, name, description} = this.state;
        this.props.editItem(id, name, description);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <input  name="name"
                    type="text"
                    placeholder="Name..."
                    value={this.state.name}
                    onChange={this.handleChange} />
            <input  name="description"
                    type="text"
                    placeholder="Description..."
                    value={this.state.description}
                    onChange={this.handleChange} />
            <button>Update Item</button>
        </form>  
        )
    }
}
export default EditItem;