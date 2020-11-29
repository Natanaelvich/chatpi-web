import styled, { css } from 'styled-components';

interface ChatProps {
  active: boolean;
}

const boxShadow = css`
  -webkit-box-shadow: 0px 0px 1px 3px #de595c;
  -moz-box-shadow: 0px 0px 1px 3px #de595c;
  box-shadow: 0px 0px 1px 3px #de595c;
`;

export const Container = styled.aside`
  background: #202225;
  display: flex;
  flex-direction: column;
  width: 350px;
  overflow: auto;
`;
export const TitleChats = styled.h1`
  text-align: center;
  margin-bottom: 12px;
`;
export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CircleOnline = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #24cc63;
  margin-left: 6px;
`;
export const Chat = styled.button<ChatProps>`
  transition: all 0.2s;
  border: 0;
  background: transparent;
  padding: 15px 20px;
  color: #eee;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    max-width: 100px;
  }

  img {
    border-radius: 20px;
    margin-right: 12px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    color: #de595c;
  }
  ${props =>
    props.active
      ? css`
          color: #de595c;
        `
      : css`
          color: #fff;
          box-shadow: 0;
        `}

  small {
    color: #89748a;
    width: 100px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    max-width: 100px;
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
export const NameUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
