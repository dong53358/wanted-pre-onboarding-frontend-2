import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardItem from "./components/BoardItem";
import { kanbanBoardData } from "./recoil/atoms";

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
  width: 1000px;
  height: 400px;
  border: 1px solid black;
  padding: 10px;
`;

const Title = styled.span`
  padding: 10px;
  font-size: 50px;
  font-weight: bold;
`;

function App() {
  const [datas, setData] = useRecoilState(kanbanBoardData);
  const [title, setTitle] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const dateTime = Date.now();
    setData((prev) => [...prev, { title, dateTime }]);
    setTitle("");
  };

  return (
    <Main>
      <Issue>
        <Title>Issue</Title>
        <form onSubmit={onSubmit}>
          <input value={title} onChange={onTitleChange} />
          <button type="submit">추가</button>
        </form>
        {datas.map((data, index) => (
          <BoardItem key={index} data={data} />
        ))}
      </Issue>
    </Main>
  );
}

export default App;
