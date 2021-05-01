import { urls } from '@/constants';
import { useAuth } from '@/hooks/modules/AuthContext';
import { MessageProps } from '@/pages/chat';
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
  CircleMessagesNoReads,
} from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  clerk: string | null;
}

interface ChatProps {
  users: User[];
  attendants: User[];
  chatActivity: Record<string, any>;
  setChatActivity: Function;
  usersLoggeds: Record<string, any>;
  typing: Record<string, any>;
  getLastMessage: Function;
  chatShow: Record<string, any>;
  messages: MessageProps[];
  getMessagesNoReadedsArray: Function;
  setMessages: Function;
}

const ChatList: React.FC<ChatProps> = ({
  users,
  chatActivity,
  setChatActivity,
  usersLoggeds,
  typing,
  getLastMessage,
  chatShow,
  attendants,
  messages,
  getMessagesNoReadedsArray,
  setMessages,
}) => {
  const { user } = useAuth();

  function readyMessages(u) {
    const messagesReadeds = messages.map(m =>
      m.id === u.id
        ? {
            ...m,
            readed: true,
          }
        : m,
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `@GoBarber:messages:${user.id}`,
        JSON.stringify(messagesReadeds),
      );
    }
    setMessages(messagesReadeds);
  }
  return (
    <Container chatShow={chatShow}>
      <ChatListContent>
        {users
          .filter(u => u.clerk === null)
          .map(
            u =>
              messages.find(m => m.id === u.id) && (
                <Chat
                  active={chatActivity && u.id === chatActivity.id}
                  key={u.id}
                  onClick={() => {
                    setChatActivity(u);
                    readyMessages(u);
                  }}
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
                    {getMessagesNoReadedsArray(u).length > 0 && (
                      <CircleMessagesNoReads>
                        <small>{getMessagesNoReadedsArray(u).length}</small>
                      </CircleMessagesNoReads>
                    )}
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
              ),
          )}
        <TitleChats>Atendentes</TitleChats>
        {attendants.length === 0 && (
          <TitleAttendant>Não existem atendentes ainda!</TitleAttendant>
        )}
        {attendants.filter(u => u.clerk === 'enf').length > 0 && (
          <TitleAttendant>Enfermeiros(a)</TitleAttendant>
        )}
        {attendants
          .filter(u => u.clerk === 'enf')
          .map(u => (
            <Chat
              active={chatActivity && u.id === chatActivity.id}
              key={u.id}
              onClick={() => {
                readyMessages(u);
                setChatActivity(u);
              }}
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
                {getMessagesNoReadedsArray(u).length > 0 && (
                  <CircleMessagesNoReads>
                    <small>{getMessagesNoReadedsArray(u).length}</small>
                  </CircleMessagesNoReads>
                )}
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
        {attendants.filter(u => u.clerk === 'psic').length > 0 && (
          <TitleAttendant>Psicólogos(a)</TitleAttendant>
        )}
        {attendants
          .filter(u => u.clerk === 'psic')
          .map(u => (
            <Chat
              active={chatActivity && u.id === chatActivity.id}
              key={u.id}
              onClick={() => {
                readyMessages(u);
                setChatActivity(u);
              }}
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
                {getMessagesNoReadedsArray(u).length > 0 && (
                  <CircleMessagesNoReads>
                    <small>{getMessagesNoReadedsArray(u).length}</small>
                  </CircleMessagesNoReads>
                )}
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
