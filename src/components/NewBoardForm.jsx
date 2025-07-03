import { useState } from "react";

const NewBoardForm = (props) => {

const [isFormVisible, setIsFormVisible] = useState(false);
const [title, setTitle] = useState('');
const [owner, setOwner]= useState('');

const handleFormSubmit = () => {
    if (!title || !owner) 
        return; 
    props.handleSubmitBoard({ title, owner }); 
    setTitle('');
    setOwner('');
    setIsFormVisible(false);
};

    return(
    <>
        <button onClick={() => setIsFormVisible(!isFormVisible)}>New Board</button>
        {isFormVisible && 
        <div>
            <input 
            value={title}
            placeholder="Board Title"
            onChange={(e) => setTitle(e.target.value)}
            />
            <input 
            value={owner}
            placeholder="Owner's Name"
            onChange={(e) => setOwner(e.target.value)}
            />
            <button onClick={handleFormSubmit}>Submit Board</button>
        </div>
        }
    </>
    )
}

export default NewBoardForm;