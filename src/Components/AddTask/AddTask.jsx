import { useState } from "react";

const AddTask = () => {
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('low');
    // observing input for adding task 
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            onAddTask({ id: Date.now(), text: newTask, completed: false });
            setNewTask('');
            
        }


        return (
        <div className="grid  grid-cols-1 md:grid-cols-2 space-y-5 md:gap-5">
            <div>
            <input type="text" placeholder="Write Things to do"value={newTask} onChange={handleInputChange}
 className=" w-full max-w-xs outline-none border-0  border-b-red-700 border-b-2 mt-0 md:mt-10" />

          <div>
                <select value={priority} onChange={handlePriorityChange} className="border border-gray-300 rounded px-3 py-1">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            </div>
            <div>
            <button onClick={handleAddTask} className="btn btn-outline btn-error ">Add Task</button>
            </div>
        </div>
    );
        }
};

export default AddTask;