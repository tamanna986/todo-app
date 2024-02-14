import  { useState} from 'react';

const AddTask = ({onAddTask}) => {
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('low');

    // for observing changes of input
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    // for priorty changing issue
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    // new task is adding functionality
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            onAddTask({ id: Date.now(), text: newTask, priority, completed: false });
            setNewTask('');
            setPriority('low');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

         <div>
                <input
                    type="text"
                    placeholder="Write Things to do"
                    className="w-full max-w-xs outline-none border-0 border-b-red-700 border-b-2 mt-0 md:mt-5"
                    value={newTask}
                    onChange={handleInputChange}
                />
                
 </div>
           
            <div className='mt-3'>
                <select value={priority} onChange={handlePriorityChange} className="border-0 border-b-2 border-red-700 outline-none rounded px-3 py-1">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
                        <div>
                <button className="btn btn-outline btn-error" onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};
export default AddTask;
