import { useState } from "react";
import styled from "styled-components";
import Modal from "./components/Modal";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Issue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  height: 400px;
  border: 1px solid black;
`;

const Title = styled.span`
  padding: 10px;
  font-size: 50px;
  font-weight: bold;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  margin-bottom: 100px;
`;

const BoardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
  border: 1px solid black;
  background-color: var(--primary-100);
  width: 200px;
  `;

const BoardItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  border: 1px solid black;
`;

const InputModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  background-color: var(--primary-100);
  cursor: pointer;
  :hover {
    background-color: var(--primary-200);
  }
  :active {
    background-color: var(--primary-300);
  }
`;
const ModalArea = styled.div`
  position: fixed;
`;

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "todo",
      items: [
        { id: 1, title: "11" },
        { id: 1, title: "22" },
        { id: 1, title: "33" },
      ],
    },
    {
      id: 2,
      title: "doing",
      items: [
        { id: 4, title: "44" },
        { id: 5, title: "55" },
        { id: 6, title: "66" },
      ],
    },
    {
      id: 3,
      title: "done",
      items: [
        { id: 7, title: "77" },
        { id: 8, title: "88" },
        { id: 9, title: "99" },
      ],
    },
  ]);

  const [isModalClicked, setIsModalClicked] = useState(false);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const modalClose = () => {
    setIsModalClicked((prev) => !prev);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "items") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, board, item) => {
    console.log(board);
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const DropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = "none";
  };

  const dropCardHandle = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = "none";
  };

  return (
    <Main>
      <Issue>
        <Title>Issue</Title>
        <InputModalBtn onClick={modalClose}>issue 추가</InputModalBtn>
        {
          <Boards>
            {boards.map((board, index) => (
              <div
                key={index}
                className="board"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandle(e, board)}
              >
                <BoardTitle>{board.title}</BoardTitle>
                {board.items.map((item, index) => (
                  <BoardItem
                    key={index}
                    draggable={true}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, board, item)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => DropHandler(e, board, item)}
                    className="item"
                  >
                    {item.title}
                  </BoardItem>
                ))}
              </div>
            ))}
          </Boards>
        }
      </Issue>
      <ModalArea>{isModalClicked && <Modal onClose={modalClose} />}</ModalArea>
    </Main>
  );
}

export default App;
