import React from 'react'
import TodoTask from './TodoTask'

class Todo extends React.Component {
    state = {
        elements: [
            { id: '12345', isDone: false, title: 'Cook dinner' },
            { id: '22346', isDone: false, title: 'Clean up the kitchen' },
            { id: '32346', isDone: false, title: 'Dry the dishes' },
            { id: '42346', isDone: false, title: 'Hang new towels' },
            { id: '52346', isDone: false, title: 'Organize shoes' },
            { id: '62346', isDone: false, title: 'Vacuum the basement' },
        ],
        inputValue: ''
    }

    updateDone(id) {
        // poszukiwanie elementu poprzez przekazane id
        const index = this.state.elements.findIndex(x => x.id === id);
        const updatedElements = this.state.elements;
        // zmiana na odwrotna wartosc isDone
        updatedElements[index].isDone = !updatedElements[index].isDone;
        // ustawirnir nowy status
        this.setState({ elements: updatedElements })
    }

    addTask() {
        // tworzenie nowego taska
        const item = {
            id: Math.random(),
            title: this.state.inputValue
        }
        const newElements = [item, ...this.state.elements]
        this.setState({ elements: newElements })
        this.setState({inputValue: ''})
    }

    inputHandler(event) {
        // wpisany tekst zostaje przekazany do state (inputValue)
        const newValue = event.target.value;
        if (newValue === '') {
            this.setState({ inputValue: 'empty task!' })
        }
        else {
            this.setState({ inputValue: newValue })
        }
        
    }

    render() {
        const elem = this.state.elements.map(el => {
            // zwraca: Todotask oraz referencja do funkcji
            return <TodoTask element={el} clicked={this.updateDone.bind(this)} />
        })
        return (
            <div id="tasks">
                <h1>Todo app</h1>
                <input type="text" value={this.state.inputValue} onChange={this.inputHandler.bind(this)} />
                <button onClick={this.addTask.bind(this)}>Add new task</button>
                {elem}
            </div>
        )
    }
}

export default Todo;