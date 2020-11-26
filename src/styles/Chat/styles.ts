import styled, { css } from 'styled-components';

interface ContainerProps {
  focused: boolean;
}
interface MessageProps {
  owner: boolean;
}
export const HeaderChat = styled.div`
  background: #232129;
  height: 50px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    margin-right: 20px;
  }

  img {
    border-radius: 20px;
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
  flex: 1;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  transform: rotate(180deg);
  direction: rtl;

  p {
    transform: rotate(180deg);
    direction: ltr;
  }
`;
export const Message = styled.p<MessageProps>`
  max-width: 50vw;
  overflow-wrap: break-word;
  align-self: ${props => (props.owner ? 'flex-end' : 'flex-start')};
  color: ${props => (props.owner ? '#DE595C' : '#f4ede8')};

  transform: rotate(180deg);
  direction: ltr;
`;
export const InputMessage = styled.div<ContainerProps>`
  background: #232129;
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
      color: #343152;
      border-color: #343152;
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
