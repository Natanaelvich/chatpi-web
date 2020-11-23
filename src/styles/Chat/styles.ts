import styled, { css } from 'styled-components';

interface ContainerProps {
  focused: boolean;
}
export const HeaderChat = styled.div`
  background: #232129;
  height: 50px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    border-radius: 20px;
    margin-left: 20px;
  }
`;
export const Chat = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const Messages = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
`;
export const InputMessage = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  transition: border 0.2s;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;
  position: relative;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.focused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  button {
    background: transparent;
    border: 0;
    color: #f4ede8;
  }

  > svg {
    margin-right: 16px;
    transition: color 0.2s;
  }
`;
