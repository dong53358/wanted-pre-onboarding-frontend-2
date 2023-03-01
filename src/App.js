import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardItem from "./components/BoardItem";
import Modal from "./components/Modal";
import { initialIssueList } from "./data";

function App() {
  const [issueList, setIssueList] = useState(initialIssueList);
  const [isModalOpen, setIsModalOpen] = useState({ open: false, status: "" });

  const getIssueList = () => {
    if (localStorage.getItem("issueList")) {
      setIssueList(JSON.parse(localStorage.getItem("issueList")));
    }
  };

  const modalOpen = (status) => {
    setIsModalOpen({ open: true, status: status });
  };

  const modalClose = () => {
    setIsModalOpen({ ...isModalOpen, open: false });
    getIssueList();
  };

  useEffect(() => {
    getIssueList();
  }, []);

  return (
    <Main>
      <Issue>
        <Title>Issue</Title>
        <Boards>
          {issueList.map((issuelist, index) => (
            <Board key={index}>
              <InputModalBtn onClick={() => modalOpen(issuelist?.title)}>
                + 추가
              </InputModalBtn>
              <BoardTitle>{issuelist.title}</BoardTitle>
              <ul>
                {issuelist.items.map((item, index) => (
                  <BoardItem key={index} item={item} className="item">
                    {item.title}
                  </BoardItem>
                ))}
              </ul>
            </Board>
          ))}
        </Boards>
      </Issue>
      <ModalArea>
        {isModalOpen.open && (
          <Modal
            modalClose={modalClose}
            issueList={issueList}
            status={isModalOpen.status}
          />
        )}
      </ModalArea>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Issue = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Title = styled.span`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Boards = styled.div`
  display: flex;
  gap: 1rem;
`;

const Board = styled.div`
  width: 300px;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
`;

const InputModalBtn = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #f1f3f5;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const BoardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ModalArea = styled.div`
  position: fixed;
`;

export default App;
