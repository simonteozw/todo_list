import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <div className = "item" 
                key = {this.props.name} 
                draggable = "true" 
                onDragStart = {() => this.props.onDragStart(this.props.item)}
                onDragEnd = {() => this.props.onDragEnd()}
            >
                <h5>Name: {this.props.name}</h5>
                <p>description: {this.props.description}</p>
                <button onClick={() => this.props.editingItem(this.props.item.id)}>Edit Item</button>
                <button onClick={() => this.props.onRemoveItem(this.props.item.id)}>Complete Item</button>
            </div>
        );
    }
}

export default Item;