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
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  button {
    border: 0;
    background: transparent;
  }

  section {
    display: flex;
    align-items: center;
    div {
      margin-right: 12px;
      small {
        color: #89748a;
        font-size: 12px;
      }
    }
    p {
      margin-right: 20px;
    }

    img {
      border-radius: 20px;
    }
  }
`;
export const Chat = styled.div`
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

  small {
    transform: rotate(180deg);
    direction: ltr;
    color: #89748a;
    font-size: 12px;
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
      border-color: #de595c;
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
export const Header = styled.header`
  padding: 10px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    margin-left: auto;
    background: transparent;
    border: 0;
    margin-right: 12px;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
