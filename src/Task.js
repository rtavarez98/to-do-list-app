import React from 'react';

export default function Task({task, handleTaskState, deleteTask}) {

    function handleTaskClick() {
        handleTaskState(task.id)
    }

    function deleteBtn() {
        deleteTask(task.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={task.complete} onChange={handleTaskClick}/>
                {task.name}
                <input type="button" value="Delete Task" onClick={deleteBtn}/>
            </label>
        </div>
    )
}