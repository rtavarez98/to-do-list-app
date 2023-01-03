import React, {useState, useRef, useEffect} from 'react';
import TaskList from './TaskList';
import './App.css';

const { v4: uuidv4 } = require('uuid');
const LOCAL_STORAGE_KEY = 'taskApp.tasks'

export default function App() {
    const [tasks, setTasks] = useState([]);
    const taskNameRef = useRef();

    document.title = "To-Do List";

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedTasks) setTasks(storedTasks);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks])

    function handleTaskState(id){
        const newTasks = [...tasks];
        const task = newTasks.find(task => task.id === id);
        task.complete = !task.complete;
        setTasks(newTasks);
    }

    function addTask() {
        const name = taskNameRef.current.value;
        if(name === '') return;
        setTasks(prevTasks => {
            return [...prevTasks, {id: uuidv4(), name: name, complete: false}];
        })
        taskNameRef.current.value = null;
    }

    function deleteTask(id) {
        const newTasks = [...tasks];
        setTasks(newTasks.filter(task => task.id !== id));
    }

    function deleteCompleteTask() {
        const newTasks = [...tasks]
        setTasks(newTasks.filter(task => task.complete !== true))
    }

    return (
        <html className="App">
            <h1>To-Do List</h1>
            <h2>{tasks.filter(task => task.complete === false).length} task(s) to do</h2>
            <input ref={taskNameRef} type="text"></input>
            <button onClick={addTask}> Create New Task </button>
            <button onClick={deleteCompleteTask}> Clear Completed Tasks </button>
            <p>
                <TaskList tasks={tasks} handleTaskState={handleTaskState} deleteTask={deleteTask}/>
            </p>
        </html>
    )
}
