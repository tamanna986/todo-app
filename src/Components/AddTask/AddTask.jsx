const AddTask = () => {
        return (
        <div className="grid  grid-cols-1 md:grid-cols-2 space-y-5 md:gap-5">
            <div>
            <input type="text" placeholder="Write Things to do" className=" w-full max-w-xs outline-none border-0  border-b-red-700 border-b-2 mt-0 md:mt-10" />
            </div>
            <div>
            <button className="btn btn-outline btn-error ">Add Task</button>
            </div>
        </div>
    );

};

export default AddTask;