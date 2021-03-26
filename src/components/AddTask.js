import React, { useState } from 'react'

//Each input in form has its own state which is component lvl state
// Input values = state and onChange = setState method. e is event object


function AddTask({ onAdd }) {

    const [text, setText] = useState("")
    const [day, setDay] = useState("")
    const [reminder, setReminder] = useState(false)

    function onSubmit(e) {
        e.preventDefault();

        if (!text) {
            alert('Please Add Text')
            return
        }

        onAdd({ text, day, reminder })
        setText('')
        setDay('')
        setReminder(false)


    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type='text' placeholder="Add Task" value={text} onChange={(e) => {
                    setText(e.target.value)
                }} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type='text' placeholder="Add Day and Time" value={day} onChange={(e) => {
                    setDay(e.target.value)
                }} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder} onChange={(e) => {
                    setReminder(e.currentTarget.checked)
                }} />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask