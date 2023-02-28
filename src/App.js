import { useEffect, useState } from "react";
import styled from "styled-components";
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

        {
          <Boards>
            {initialIssueList.map((issuelist, index) => (
              <div key={index} className="board">
                <InputModalBtn onClick={() => modalOpen(issuelist?.title)}>
                  + 추가
                </InputModalBtn>
                <BoardTitle>{issuelist.title}</BoardTitle>
                {issuelist.items.map((item, index) => (
                  <BoardItem
                    key={index}
                    issue={item}
                    issuelist={issuelist}
                    className="item"
                  />
                ))}
              </div>
            ))}
          </Boards>
        }
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
`;

const Title = styled.span`
  padding: 10px;
  font-size: 50px;
  font-weight: bold;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 100px;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const InputModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 10px 0px 5px 0px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: var(--gray6);
  }
`;

const BoardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
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

const ModalArea = styled.div`
  position: fixed;
`;

export default App;
