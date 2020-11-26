import styled, { css } from 'styled-components';

interface ChatProps {
  active: boolean;
}

const boxShadow = css`
  -webkit-box-shadow: 0px 0px 1px 3px rgba(240, 240, 240, 1);
  -moz-box-shadow: 0px 0px 1px 3px rgba(240, 240, 240, 1);
  box-shadow: 0px 0px 1px 3px rgba(240, 240, 240, 1);
`;

export const Container = styled.aside`
  background: #202225;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const TitleChats = styled.h1`
  text-align: center;
  margin-bottom: 12px;
`;
export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Chat = styled.button<ChatProps>`
  width: 150px;
  transition: all 0.2s;
  border: 0;
  background: transparent;
  margin: 0 0 18px;
  background: #de595c;
  padding: 5px 10px;
  border-radius: 12px;
  color: #eee;
  overflow: hidden;
  &:hover {
    ${boxShadow}
    color: #fff;
  }
  ${props =>
    props.active
      ? css`
          ${boxShadow}
        `
      : css`
          box-shadow: 0;
        `}
  h1 {
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
export const NewChat = styled.button`
  border: 1px dashed rgba(255, 255, 255, 0.3);
  background: transparent;
  margin: 0 0 8px;
  transition: all 0.2s;
  padding: 5px 10px;
  border-radius: 12px;
  width: 150px;
  &:hover {
    ${boxShadow}
    background: #DE595C;
  }
`;
