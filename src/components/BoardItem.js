import React from "react";
import styled from "styled-components";

const Main = styled.li`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

function BoardItem({ ...props }) {
  const { item, key } = props;
  return <Main key={key}>{item?.title}</Main>;
}

export default BoardItem;
