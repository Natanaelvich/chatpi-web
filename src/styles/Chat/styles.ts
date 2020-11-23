import styled from 'styled-components';

export const Chat = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    width: 600px;
    border: 1px solid #ddd;
    height: 50px;
    padding: 0 20px;
    font-size: 14px;
  }

  button {
    width: 600px;
    height: 50px;
    font-size: 14px;
    background: #069;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    color: #fff;
    margin-top: 10px;
  }
`;
export const Messages = styled.div`
  width: 600px;
  height: 400px;
  margin: 20px 0;
  padding: 20px;
`;
