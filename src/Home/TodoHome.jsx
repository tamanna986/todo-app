

import { useEffect, useState } from "react";
import AddTask from "../Components/AddTask/AddTask";

const TodoHome = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [filter, setFilter] = useState('all');

    // setting up task on local storage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    //  for marking as complete or incomplete a task
    const handleToggleCompletion = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // for deleting a task
    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    // for editing a task
    const handleEditTask = (taskId, newText) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, text: newText } : task
            )
        );
    };
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.priority === filter);

    return (
        <div>
            <div className="flex gap-1 items center justify-center">
                <img className="w-10" src="/src/assets/logo.jpg" alt="" />
                <h1 className="font-bold text-red-600 text-3xl">To-Do List</h1>
            </div>
            <div className="w-1/2 lg:w-[850px] mx-auto my-8  px-32">
                <AddTask onAddTask={handleAddTask} />
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-10">
                        <h2 className="font-bold text-red-600 text-2xl" >Total Tasks: {tasks.length}</h2>
                        <h2  className="font-bold text-blue-900 text-2xl">Completed Tasks: {tasks.filter(task => task.completed).length}</h2>
                    </div>

                    {/* for filtering by priority */}
                    <div>
                        <label htmlFor="filter">Filter by Priority:</label>
                        <select id="filter" value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <ul>

                        {/* showing the tasks based on the filter */}
                        {filteredTasks.map(task => (
                            <li key={task.id}>
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                                <button onClick={() => handleToggleCompletion(task.id)}>
                                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                <span>Priority: {task.priority}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoHome;
