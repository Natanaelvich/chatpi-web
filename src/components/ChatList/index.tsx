import { urls } from '@/constants';
import React from 'react';
import {
  Container,
  Chat,
  ChatList as ChatListContent,
  TitleChats,
  CircleOnline,
  NameUser,
  AvatarContainer,
  TitleAttendant,
} from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ChatProps {
  users: User[];
  chatActivity: Record<string, any>;
  setChatActivity: Function;
  usersLoggeds: Record<string, any>;
  typing: Record<string, any>;
  getLastMessage: Function;
  chatShow: Record<string, any>;
}

const ChatList: React.FC<ChatProps> = ({
  users,
  chatActivity,
  setChatActivity,
  usersLoggeds,
  typing,
  getLastMessage,
  chatShow,
}) => {
  return (
    <Container chatShow={chatShow}>
      <ChatListContent>
        <TitleChats>Atendentes</TitleChats>
        <TitleAttendant>Enfermeiros</TitleAttendant>
        {users
          .filter(u => u.clerk === 'enf')
          .map(u => (
            <Chat
              active={chatActivity && u.id === chatActivity.id}
              key={u.id}
              onClick={() => setChatActivity(u)}
            >
              <AvatarContainer>
                <img
                  src={
                    u?.avatar_url ||
                    `${urls[process.env.NODE_ENV]}/myAvatars/${u.id}`
                  }
                  alt={u.name}
                  width="40"
                  height="40"
                />
                {usersLoggeds && usersLoggeds[u?.id] && <CircleOnline />}
              </AvatarContainer>
              <section>
                <NameUser>
                  <h1>{u.name}</h1>
                </NameUser>
                {typing && typing[u?.id] ? (
                  <small>Digitando...</small>
                ) : (
                  <small>{getLastMessage(u)}</small>
                )}
              </section>
            </Chat>
          ))}
        <TitleAttendant>Psicólogo</TitleAttendant>
        {users
          .filter(u => u.clerk === 'psic')
          .map(u => (
            <Chat
              active={chatActivity && u.id === chatActivity.id}
              key={u.id}
              onClick={() => setChatActivity(u)}
            >
              <AvatarContainer>
                <img
                  src={
                    u?.avatar_url ||
                    `${urls[process.env.NODE_ENV]}/myAvatars/${u.id}`
                  }
                  alt={u.name}
                  width="40"
                  height="40"
                />
                {usersLoggeds && usersLoggeds[u?.id] && <CircleOnline />}
              </AvatarContainer>
              <section>
                <NameUser>
                  <h1>{u.name}</h1>
                </NameUser>
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
