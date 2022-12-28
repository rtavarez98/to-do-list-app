import React from 'react';
import Task from './Task';

export default function TaskList({tasks, handleTaskState, deleteTask}) {
    return (
        tasks.map(task =>{
            return <Task key={task.id} handleTaskState={handleTaskState} deleteTask={deleteTask} task={task}/>
        })
    )
}