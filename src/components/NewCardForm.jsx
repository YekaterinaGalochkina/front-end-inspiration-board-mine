import { useState } from "react";

const NewCardForm = (props) => {

const [isFormVisible, setIsFormVisible] = useState(false);
const [message, setMessage] = useState('');

const handleFormSubmit = () => {
    if (!message)
        return; 
    props.handleSubmitCard({ message }); 
    setMessage('');
    setIsFormVisible(false);
};

    return(
    <>
        <button onClick={() => setIsFormVisible(!isFormVisible)}>New Card</button>
        {isFormVisible && 
        <div>
            <input 
            value={message}
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleFormSubmit}>Submit Card</button>
        </div>
        }
    </>
    )
}

export default NewCardForm;