import { useEffect, useRef, useState } from "react";
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

  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current?.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setIssueList((prev) => {
        const newList = JSON.parse(JSON.stringify(prev)); // deep copy
        const targetList = newList[params.issuelistId]?.items;
        const selectedList = newList[currentItem?.issuelistId]?.items;
        targetList?.splice(
          params.itemId,
          0,
          selectedList?.splice(currentItem?.itemId, 1)[0]
        );
        targetList[0].status =
          params.issuelistId === 0
            ? "todo"
            : params.issuelistId === 1
            ? "progress"
            : "complete";
        dragItem.current = params;
        return newList;
      });
      localStorage.setItem("issueList", JSON.stringify(issueList));
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current?.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
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
          {issueList.map((issuelist, issuelistId) => (
            <Board key={issuelistId}>
              <InputModalBtn onClick={() => modalOpen(issuelist?.title)}>
                + 추가
              </InputModalBtn>
              <BoardTitle>{issuelist.title}</BoardTitle>
              <ul
                onDragEnter={
                  dragging && dragItem.current.issuelistId !== issuelistId
                    ? (e) => handleDragEnter(e, { issuelistId, itemId: 0 })
                    : null
                }
                style={{ height: "100%" }}
              >
                {issuelist.items.map((item, itemId) => (
                  <BoardItem
                    key={itemId}
                    item={item}
                    itemId={itemId}
                    getIssueList={getIssueList}
                    issuelist={issuelist}
                    issuelistId={issuelistId}
                    dragging={dragging}
                    handleDragStart={handleDragStart}
                    handleDragEnter={handleDragEnter}
                    issueList={issueList}
                    dragItem={dragItem}
                    className="item"
                  >
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
  font-size: 2.5rem;
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
