import React from 'react'

const TodoTask = props => {
    return (
        <div className={`task ${props.element.isDone ? 'done' : ''}`} key={props.element.id}>
            {/* Tytul zadania */}
            {props.element.title}
            {/* Guzik 'zrobione', po wcisnieciu wywoluje funkcje checkIfDone */}
            <button onClick={() => props.clicked(props.element.id)}>Done</button>
        </div>
    )
}

export default TodoTask;