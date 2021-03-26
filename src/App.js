import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Footer from "./components/Footer"
import About from "./components/About"

function App() {

  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(4)
  const [taskvisibility, setTaskVisibility] = useState(false)

  useEffect(() => {
    async function getTasks() {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])

  //fetches tasks

  async function fetchTasks() {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data;
  }



  async function handleDelete(id) {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    const newTasks = tasks.filter((task) => {
      return task.id !== id
    })

    setTasks(newTasks)
  }

  async function fetchTask(id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    return data
  }

  async function handleToggle(id) {

    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const newTasks = tasks.map((task) => {
      return (task.id === id) ? { ...task, reminder: !task.reminder } : task
    })

    setTasks(newTasks)
  }

  async function addTask(task) {

    await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    task.id = id //Here setting the id to 4 and 
    setId(id + 1) //incrementing it each time task is added
    const newTasks = [...tasks, task]
    setTasks(newTasks)
  }

  function toggleTaskVisibility() {
    setTaskVisibility(!taskvisibility)
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onVisible={toggleTaskVisibility} taskVisibility={taskvisibility} />

        <Route path="/" exact render={(props) => (
          <>
            {taskvisibility && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} /> : 'No Tasks to show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
