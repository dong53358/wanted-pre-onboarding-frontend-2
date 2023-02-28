import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { kanbanBoardData } from "../recoil/atoms";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  border: 1px solid black;
  color: black;
  button {
    border: 1px solid black;
  }
`;

function BoardItem({ ...props }) {
  const { issue, issueList } = props;

  const [prevData, setPrevData] = useRecoilState(kanbanBoardData);

  const boardItemDelete = (id) => {
    const createBoard = prevData.filter((x) => x.dateTime !== id);
    console.log(createBoard);
    setPrevData(createBoard);
  };
  return (
    <Main>
      <div>{issue?.title}</div>
      {/* <button onClick={() => boardItemDelete(data.data.dateTime)}>삭제</button> */}
    </Main>
  );
}

export default BoardItem;
