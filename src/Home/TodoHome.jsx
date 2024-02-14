

import { useEffect, useState } from "react";
import AddTask from "../Components/AddTask/AddTask";

const TodoHome = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    console.log(tasks)
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
            <div className="w-[404px] md:w-[700px] lg:w-[850px] mx-auto my-8  px-32">
                <AddTask onAddTask={handleAddTask} />
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-10 pb-2 border-b-2 border-red-700 border-dotted ">
                        <h2 className="font-semibold text-red-600 text-xl" >Total Tasks: {tasks.length}</h2>
                        <h2 className="font-semibold text-blue-900 text-xl">Completed Tasks: {tasks.filter(task => task.completed).length}</h2>
                    </div>

                    {/* for filtering by priority */}
                    <div>
                        <label className="text-lg text-gray-600 " htmlFor="filter">Filter by Priority </label>
                        <select id="filter"
                            value={filter}
                            className="border-0 border-b-2 border-red-700 outline-none rounded px-3 py-1"
                            onChange={e => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <ul>

                        {/* showing the tasks based on the filter */}
                        {filteredTasks.map(task => (
                            <li
                                className="w-[150px] md:w-full p-3 border-b-4 rounded-2xl border-red-700  my-4 text-start flex flex-wrap justify-around bg-slate-800 text-white"
                                key={task.id}>
                                <span
                                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                                {task.priority === 'low' && <span className="bg-blue-500 badge  text-sm text-white">Low</span>}
                                {task.priority === 'medium' && <span className="bg-green-500 text-white badge  text-sm">Medium</span>}
                                {task.priority === 'high' && <span className="text-white bg-red-700 badge text-sm">High</span>}

                                <button
                                    onClick={() => handleToggleCompletion(task.id)}>
                                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button className="btn btn-sm btn-outline btn-success"
                                    onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))}>Edit</button>
                                <button className=" btn btn-sm  btn-outline btn-error"
                                    onClick={() => handleDeleteTask(task.id)}>Delete</button>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoHome;
