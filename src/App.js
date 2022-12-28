import React, {useState, useRef} from 'react';
import TaskList from './TaskList';
import './App.css';
const { v4: uuidv4 } = require('uuid');
//add function to edit tasks
//add function to delete completed tasks
export default function App() {
    const [tasks, setTasks] = useState([]);
    const taskNameRef = useRef();

    function handleTaskState(id){
        const newTasks = [...tasks]
        const task = newTasks.find(task => task.id === id)
        task.complete = !task.complete
        setTasks(newTasks)
    }

    function addTask() {
        const name = taskNameRef.current.value
        if(name === '') return
        setTasks(prevTasks => {
            return [...prevTasks, {id: uuidv4(), name: name, complete: false}]
        })
        taskNameRef.current.value = null
    }

    function deleteTask(id) {
        const newTasks = [...tasks]
        setTasks(newTasks.filter(task => task.id !== id))
    }

    return (
        <html className="App">
            <h1>To-Do List</h1>
            <h2>{tasks.filter(task => task.complete === false).length} task(s) to do</h2>
            <input ref={taskNameRef} type="text"></input>
            <button onClick={addTask}> Create New Task </button>
            <p>
                <TaskList tasks={tasks} handleTaskState={handleTaskState} deleteTask={deleteTask}/>
            </p>
        </html>
    )
}
