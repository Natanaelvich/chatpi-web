import styled, { css } from 'styled-components';

interface ChatProps {
  active: boolean;
}
interface ContainerProps {
  chatShow: Record<string, any>;
}

export const Container = styled.aside<ContainerProps>`
  background: #1d1b38;
  display: flex;
  flex-direction: column;
  width: 250px;
  overflow: auto;

  @media (max-width: 425px) {
    ${props =>
      props.chatShow &&
      css`
        display: none;
      `}
  }
`;
export const TitleChats = styled.h1`
  text-align: center;
  margin-bottom: 12px;
`;
export const TitleAttendant = styled.h2`
  margin-bottom: 12px;
  color: #89748a;
  font-size: 16px;
  margin-top: 24px;
  margin-left: 24px;
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
  position: absolute;
  bottom: 6px;
  right: 9px;
`;
export const AvatarContainer = styled.div`
  position: relative;

  img {
    border-radius: 20px;
    margin-right: 12px;
  }
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
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    max-width: 100px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    small {
      color: #89748a;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      align-items: center;
      max-width: 100px;
    }
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
`;
export const NameUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
