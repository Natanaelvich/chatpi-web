import React from 'react';
import { MdAdd } from 'react-icons/md';
import {
  Container,
  NewChat,
  Chat,
  ChatList as ChatListContent,
  TitleChats,
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
}
const ChatList: React.FC<ChatProps> = ({
  users,
  chatActivity,
  setChatActivity,
  usersLoggeds,
  typing,
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
            {typing && typing[u?.id] && <p>Digitando...</p>}
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
