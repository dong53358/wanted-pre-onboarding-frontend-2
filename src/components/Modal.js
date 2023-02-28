import React from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";

function Modal({ ...props }) {
  const { modalClose, issueList, status } = props;
  const STATUS_INDEX = status === "todo" ? 0 : status === "progress" ? 1 : 2;

  const [issueInputValue, setIssueInputValue, reset] = useInput({
    id: Date.now(),
    title: "",
    manager: "",
    description: "",
    status: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    issueList[STATUS_INDEX].items = [
      ...issueList[STATUS_INDEX].items,
      issueInputValue,
    ];

    localStorage.setItem("issueList", JSON.stringify(issueList));

    modalClose();
  };

  return (
    <Main>
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
          <ResetBtn type="button" onClick={reset}>
            초기화
          </ResetBtn>
          <SubmitBtn type="sumbit">저장</SubmitBtn>
        </BtnArea>
      </InputForm>
      <Overlay onClick={modalClose} />
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IssueTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 500px;
  padding: 15px;
  z-index: 10;
  label {
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
const BtnArea = styled.div`
  display: flex;
  justify-content: center;
`;

const ResetBtn = styled.button`
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
