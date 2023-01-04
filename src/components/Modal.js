import React from "react";
import styled from "styled-components";

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

const InputForm = styled.div`
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

function Modal({ onClose }) {
  return (
    <Main>
      <InputForm>
        <IssueTitle>ISSUE 등록</IssueTitle>
        <label>제목</label>
        <input type="text" placeholder="제목을 입력해주세요" />
        <label>내용</label>
        <textarea rows="5" placeholder="내용을 입력해주세요" />
        <label>마감일</label>
        <input type="datetime-local" />
        <label>담당자</label>
        <input type="text" placeholder="담당자를 입력해주세요" />
        <BtnArea>
          <SubmitBtn type="sumbit">저장</SubmitBtn>
        </BtnArea>
      </InputForm>
      <Overlay onClick={onClose} />
    </Main>
  );
}

export default Modal;
