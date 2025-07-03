import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select';
import Cards from "./components/Cards";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import "./components/Boards.css";


const baseURL = "https://back-end-inspiration-board-97fl.onrender.com";

function App() {

const [boards, setBoards] = useState([]);
const [selectedBoard, setSelectedBoard] = useState({});
const [cards, setCards] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const responce = await axios.get(`${baseURL}/boards`);
      setBoards(responce.data);
    } catch (err) {
      console.error(err)
    }
  }
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const responce = await axios.get(`${baseURL}/boards/${selectedBoard.id}/cards`);
      setCards(responce.data);
    } catch (err) {
      console.error(err)
    }
  }
  fetchData();
}, [selectedBoard]);


const boardOptions = () => {
  return boards.map((board) => {
    return {
      value: board.title, 
      label: board.title, 
      id: board.board_id
    }
  })
}

const handleChange = (selectedOption) => {
    setSelectedBoard(selectedOption);
  };

const deleteCard = (id) => {
  axios.delete(`${baseURL}/cards/${id}`)
    .then(() => {
      setCards((cards) => cards.filter((card) => card.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting card:', error);
    });
};

const likeCard = (id) => {
  axios.patch(`${baseURL}/cards/${id}/like`)
    .then((response) => {
      const updatedCard = response.data;
      setCards((cards) =>
        cards.map((card) =>
          card.card_id === updatedCard.card_id ? updatedCard : card
        )
      );
    })
    .catch((error) => {
      console.error("Error liking card:", error);
    });
};

const handleSubmitBoard = ({ title, owner }) => {
  axios.post(`${baseURL}/boards`, { title, owner })
    .then(response => {
      const newBoard = response.data.board;
      setBoards(prev => [...prev, newBoard]);
    })
    .catch(error => console.error("Error creating board:", error));
};

const handleSubmitCard = ({ message }) => {
  axios.post(`${baseURL}/boards/${selectedBoard.id}/cards`, { message, likes_count:0 })
    .then(response => {
      const newCard = response.data;
      setCards(prev => [...prev, newCard]);
    })
    .catch(error => console.error("Error creating card:", error));
};

const deleteBoard = () => {
  axios.delete(`${baseURL}/boards/${selectedBoard.id}`)
    .then(()=> {
      setBoards(prev => prev.filter(board => board.board_id !== selectedBoard.id))
      setSelectedBoard({})
    })
    .catch(error => console.error("Error deleting board:", error));
}

  return (
    <>
    <div>
      <div className="boards-container">
        <h1>Boards</h1>
            <Select 
            placeholder={"Select Board..."}
            value={selectedBoard}
            options={boardOptions()}
            onChange={handleChange}
            />
      </div>
      <div>
        <NewBoardForm 
        handleSubmitBoard={handleSubmitBoard}
        />
      </div>
    </div>
      {Object.keys(selectedBoard).length !== 0 &&
    <div>
      <Cards 
        selectedBoard={selectedBoard}
        cards={cards}
        deleteCard={deleteCard}
        likeCard={likeCard}
        deleteBoard={deleteBoard}
      />
      <NewCardForm 
      handleSubmitCard={handleSubmitCard}
      />
      </div>
      }
    </>
  )
}

export default App
