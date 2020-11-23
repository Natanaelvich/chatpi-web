import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import {
  Container,
  NewChat,
  Chat,
  ChatList as ChatListContent,
  TitleChats,
} from './styles';

interface ChatProps {
  users: [];
  chatActivity: Record<string, any>;
  setChatActivity: Function;
  usersLoggeds: Record<string, any>;
}
const ChatList: React.FC<ChatProps> = ({
  users,
  chatActivity,
  setChatActivity,
  usersLoggeds,
}) => {
  return (
    <Container>
      <ChatListContent>
        <TitleChats>Conversas</TitleChats>
        {users.map(u => (
          <Chat
            active={chatActivity && u.id === chatActivity.id}
            key={Chat.id}
            onClick={() => setChatActivity(u)}
          >
            <h1>{u.name}</h1>
            {usersLoggeds && usersLoggeds[u?.id] && <p>Online</p>}
          </Chat>
        ))}
        <NewChat onClick={() => console.log('teste')}>
          <MdAdd size={28} color="#fff" />
        </NewChat>
      </ChatListContent>
    </Container>
  );
};

export default ChatList;
