import React from 'react';

const NewItem = ({onNewItem = f => f}) => {
    let name, description;
    const submit = e => {
        e.preventDefault();
        onNewItem(name.value, description.value);
        name.value = '';
        description.value = '';
        name.focus();
    }

    return (
        <form onSubmit={submit}>
            <input  ref={input => name = input}
                    type="text"
                    placeholder="Name..." required />
             <input  ref={input => description = input}
                    type="text"
                    placeholder="Description..." required />
            <button>Add Item</button>
        </form>
    )
}

export default NewItem;