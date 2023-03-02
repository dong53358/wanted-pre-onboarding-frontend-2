import React from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";

function Modal({ ...props }) {
  const { type, modalClose, issueList, status, item } = props;
  const STATUS_INDEX = status === "todo" ? 0 : status === "progress" ? 1 : 2;

  const [issueInputValue, setIssueInputValue] = useInput({
    id: item?.id || Date.now(),
    title: item?.title || "",
    manager: item?.manager || "",
    description: item?.description || "",
    status: status,
    date: item?.date || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const issueIndex = issueList[STATUS_INDEX].items?.findIndex(
      (item) => item.id === issueInputValue.id
    );
    type === "ADD"
      ? (issueList[STATUS_INDEX].items = [
          ...issueList[STATUS_INDEX].items,
          issueInputValue,
        ])
      : (issueList[STATUS_INDEX].items[issueIndex] = issueInputValue);
    localStorage.setItem("issueList", JSON.stringify(issueList));

    modalClose();
  };

  const deleteItem = () => {
    issueList[STATUS_INDEX].items = issueList[STATUS_INDEX].items.filter(
      (item) => item.id !== issueInputValue.id
    );
    localStorage.setItem("issueList", JSON.stringify(issueList));

    modalClose();
  };

  return (
    <>
      <InputForm onSubmit={handleSubmit}>
        <IssueTitle>ISSUE 등록</IssueTitle>
        <label>제목</label>
        <input
          name="title"
          type="text"
          value={issueInputValue.title}
          onChange={setIssueInputValue}
          placeholder="제목을 입력해주세요"
        />
        <label>담당자</label>
        <input
          name="manager"
          type="text"
          value={issueInputValue.manager}
          onChange={setIssueInputValue}
          placeholder="담당자를 입력해주세요"
        />
        <label>내용</label>
        <textarea
          name="description"
          rows="5"
          value={issueInputValue.description}
          onChange={setIssueInputValue}
          placeholder="내용을 입력해주세요"
        />
        <label>마감일</label>
        <input
          name="date"
          type="datetime-local"
          value={issueInputValue.date}
          onChange={setIssueInputValue}
        />

        <BtnArea>
          <DeleteBtn type="button" onClick={deleteItem}>
            삭제
          </DeleteBtn>
          <SubmitBtn type="sumbit">저장</SubmitBtn>
        </BtnArea>
      </InputForm>
      <Overlay onClick={modalClose} />
    </>
  );
}
const InputForm = styled.form`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  padding: 20px;
  width: 500px;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: var(--white);
  border-radius: 10px;
  label {
    text-align: start;
    margin-left: 10px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid var(--gray4);
    :focus {
      outline: 2px solid var(--text-blue);
    }
  }
  textarea {
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid var(--gray4);
    margin-bottom: 10px;
    word-break: break-all;
    :focus {
      outline: 2px solid var(--text-blue);
    }
  }
`;

const IssueTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--primary-100);
  margin-top: 10px;
  cursor: pointer;
  :hover {
    background-color: var(--primary-200);
  }
  :active {
    background-color: var(--primary-300);
  }
`;
const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--primary-100);
  margin-top: 10px;
  cursor: pointer;
  :hover {
    background-color: var(--primary-200);
  }
  :active {
    background-color: var(--primary-300);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9;
`;

export default Modal;
