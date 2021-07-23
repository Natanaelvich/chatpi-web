import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
  FormEvent,
} from 'react';
import io from 'socket.io-client';
import { urls } from '@/constants';
import api from '@/services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface ChatContextData {
  sendMessage: (e: FormEvent) => any;
  getLastMessage: (attendant: any) => any;
  getMessagesNoReadedsArray: (attendant: any) => any[];
  changeActivity: (chat: any) => void;
  changeInputFocus: (focused: boolean) => void;
  changeMessage: (message: string) => void;
  changeMessages: (messagesValues: any[]) => void;
  changeUsers: (usersValues: any[]) => void;
  changeAttedantes: (attedantesValues: any[]) => void;
  messages: any[];
  users: any[];
  attendants: any[];
  message: string;
  inputFocus: boolean;
  chatActivity: any;
  usersLoggeds: any;
  typing: any;
  socket: SocketIOClient.Socket;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendants, setAttendantes] = useState([]);
  const [message, setMessage] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [chatActivity, setChatActivity] = useState<any>();
  const [usersLoggeds, setUsersLoggeds] = useState<any>();
  const [typing, setTyping] = useState<any>();

  const socket = useMemo(() => {
    return io(urls[process.env.NODE_ENV], {
      query: { user: user?.id },
    });
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      const messagesStorage = localStorage.getItem(
        `@GoBarber:messages:${user.id}`,
      );
      if (messagesStorage) {
        setMessages(JSON.parse(messagesStorage));
      }
    }
  }, []);

  useEffect(() => {
    socket.on('messagesCache', (messagesCache: string) => {
      const messagesParse = JSON.parse(messagesCache);
      const messagesTemp = messagesParse.map(m => ({
        ...m,
        readed: false,
        id: m.user,
      }));
      setMessages(oldMessages => {
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem(
            `@GoBarber:messages:${user.id}`,
            JSON.stringify([...oldMessages, ...messagesTemp]),
          );
        }

        return [...oldMessages, ...messagesTemp];
      });
    });
    socket.on('message', messageSocket => {
      const messageParse = JSON.parse(messageSocket);

      setMessages(oldMessages => {
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem(
            `@GoBarber:messages:${user.id}`,
            JSON.stringify([
              ...oldMessages,
              {
                ...messageParse,
                // readed: chatActivity?.id
                //   ? chatActivity.id === messageParse.user
                //   : false,
                readed: false,
                id: messageParse.user,
              },
            ]),
          );
        }
        return [
          ...oldMessages,
          {
            ...messageParse,
            // readed: chatActivity?.id
            //   ? chatActivity.id === messageParse.user
            //   : false,
            readed: false,
            id: messageParse.user,
          },
        ];
      });
    });
    socket.on('usersLoggeds', usersLoggedsSocket => {
      setUsersLoggeds(JSON.parse(usersLoggedsSocket));
    });
    socket.on('typing', typingSocket => {
      setTyping(JSON.parse(typingSocket));
    });
  }, [socket, user]);

  const sendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const messageTemp = {
        id: chatActivity.id,
        user: user?.id,
        toUser: chatActivity.id,
        message,
        readed: false,
        date: new Date(),
        name: user.name,
        largeIcon:
          user?.avatar_url ||
          `${urls[process.env.NODE_ENV]}/myAvatars/${user?.id}`,
      };
      if (chatActivity) {
        socket.emit('message', JSON.stringify(messageTemp));
        setMessages(oldMessages => {
          if (typeof window !== 'undefined' && user) {
            localStorage.setItem(
              `@GoBarber:messages:${user.id}`,
              JSON.stringify([
                ...oldMessages,
                { ...messageTemp, readed: true },
              ]),
            );
          }
          return [...oldMessages, { ...messageTemp, readed: true }];
        });

        setMessage('');
      }
    },
    [socket, message, chatActivity, user],
  );

  const getLastMessage = useCallback(
    attendant => {
      const messagesUser = messages.filter(
        m =>
          (m.user === attendant.id && m.toUser === user?.id) ||
          (m.user === user?.id && m.toUser === attendant.id),
      );
      if (messagesUser.length > 0) {
        return messagesUser[messagesUser.length - 1].message;
      }
      return null;
    },
    [messages, user],
  );

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
    },
    [messages],
  );

  function changeActivity(chat: any): void {
    setChatActivity(chat);
  }

  function changeInputFocus(focused: boolean): void {
    setInputFocus(focused);
  }

  function changeMessage(messageValue: string): void {
    setMessage(messageValue);
  }

  function changeMessages(messagesValues: any[]): void {
    setMessages(messagesValues);
  }

  function changeUsers(usersValues: any[]): void {
    setUsers(usersValues);
  }

  function changeAttedantes(attedantesValues: any[]): void {
    setAttendantes(attedantesValues);
  }
  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        getLastMessage,
        getMessagesNoReadedsArray,
        messages,
        users,
        attendants,
        message,
        inputFocus,
        chatActivity,
        usersLoggeds,
        typing,
        changeActivity,
        changeInputFocus,
        socket,
        changeMessage,
        changeMessages,
        changeUsers,
        changeAttedantes,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}

export { ChatProvider, useChat };
