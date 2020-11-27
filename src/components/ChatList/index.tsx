import { urls } from '@/constants';
import React from 'react';
import {
  Container,
  Chat,
  ChatList as ChatListContent,
  TitleChats,
  CircleOnline,
} from './styles';

interface User {
  id: string;
  name: string;
}

interface ChatProps {
  users: User[];
  chatActivity: Record<string, any>;
  setChatActivity: Function;
  usersLoggeds: Record<string, any>;
  typing: Record<string, any>;
  getLastMessage: Function;
}

const ChatList: React.FC<ChatProps> = ({
  users,
  chatActivity,
  setChatActivity,
  usersLoggeds,
  typing,
  getLastMessage,
}) => {
  return (
    <Container>
      <ChatListContent>
        <TitleChats>Conversas</TitleChats>
        {users.map(u => (
          <Chat
            active={chatActivity && u.id === chatActivity.id}
            key={u.id}
            onClick={() => setChatActivity(u)}
          >
            <img
              src={`${urls[process.env.NODE_ENV]}/myAvatars/${u.id}`}
              alt={u.name}
              width="40"
              height="40"
            />
            <section>
              <h1>
                {u.name}

                {usersLoggeds && usersLoggeds[u?.id] && <CircleOnline />}
              </h1>
              {typing && typing[u?.id] ? (
                <small>Digitando...</small>
              ) : (
                <small>{getLastMessage(u)}</small>
              )}
            </section>
          </Chat>
        ))}
      </ChatListContent>
    </Container>
  );
};

export default ChatList;
