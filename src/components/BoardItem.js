import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

function BoardItem({ ...props }) {
  const {
    getIssueList,
    item,
    itemId,
    issuelistId,
    dragging,
    handleDragStart,
    handleDragEnter,
    dragItem,
  } = props;
  const [isEdit, setIsEdit] = useState(false);

  const issueList = JSON.parse(localStorage.getItem("issueList"));

  const editOpen = () => {
    setIsEdit(true);
  };
  const modalClose = () => {
    setIsEdit(false);
    getIssueList();
  };

  return (
    <>
      <IssueItemContainer
        onClick={editOpen}
        key={itemId}
        draggable
        onDragStart={(e) => handleDragStart(e, { issuelistId, itemId })}
        onDragEnter={
          dragging && dragItem.current.issuelistId === issuelistId
            ? (e) => handleDragEnter(e, { issuelistId, itemId })
            : null
        }
      >
        <ItemTitle>{item?.title}</ItemTitle>
      </IssueItemContainer>
      {isEdit && (
        <Modal
          type="EDIT"
          item={item}
          modalClose={modalClose}
          issueList={issueList}
          status={item.status}
        />
      )}
    </>
  );
}
const IssueItemContainer = styled.li`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ItemTitle = styled.h1`
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

export default BoardItem;
