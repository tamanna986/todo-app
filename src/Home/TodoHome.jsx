import AddTask from "../Components/AddTask/AddTask";
import { useEffect, useState } from "react";


const TodoHome = () => {
    const [tasks, setTasks] = useState(() => {

        // setting up in local storage
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // for adding task
    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    
    return (
        <div>
            <div className="flex gap-1 items center justify-center">
                <img className="w-10" src="/src/assets/logo.jpg" alt="" />
                <h1 className="font-bold text-red-600 text-3xl">To-Do List</h1>
            </div>
            <div className="w-1/2 lg:w-[700px] mx-auto my-8  px-32">
                <AddTask onAddTask={handleAddTask} >
                <h2>Total Tasks: {tasks.length}</h2>
                <h2>Completed Tasks: {tasks.filter(task => task.completed).length}</h2>
                <ul>
                    {filteredTasks.map(task => (
                        <li key={task.id}>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                            <button onClick={() => handleToggleCompletion(task.id)}>
                                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            
                            <span>Priority: {task.priority}</span>
                        </li>
                    ))}
                </ul>

                </AddTask>
                <div>
                </div>
            </div>
        </div>
    );
};

export default TodoHome;