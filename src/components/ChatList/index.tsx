import React, { useState } from 'react';

import {
  Container,
  NewChat,
  Chat,
  ChatList as ChatListContent,
  TitleChats,
} from './styles';

interface ChatProps {
  users: [];
}
const ChatList: React.FC<ChatProps> = ({ users }) => {
  const [chatActivity, setChatActivity] = useState(null);

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
          </Chat>
        ))}
        <NewChat onClick={() => console.log('teste')}>new</NewChat>
      </ChatListContent>
    </Container>
  );
};

export default ChatList;
