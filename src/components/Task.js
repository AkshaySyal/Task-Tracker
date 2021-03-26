import React from "react"
import ClearIcon from '@material-ui/icons/Clear';


const crossStyle = { color: 'red', cursor: 'pointer' }


function Task({ task, onDelete, onToggle }) {



    function handleClick() {
        onDelete(task.id);
    }

    function handleCheck() {
        onToggle(task.id)
    }



    return (
        <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={handleCheck}>

            <h3>{task.text}  <ClearIcon style={crossStyle} onClick={handleClick} /></h3>
            <p>{task.day}</p>

        </div>
    )

}

export default Task