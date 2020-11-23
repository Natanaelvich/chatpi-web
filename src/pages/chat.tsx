import Button from '@/components/Button';
import ChatList from '@/components/ChatList';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/modules/AuthContext';
import api from '@/services/api';
import { Chat, Messages } from '@/styles/Chat/styles';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import { Container } from '../styles/SingnIn/styles';

export default function ChatHome() {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('users');

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_API_KEY, {
      query: { user: user?.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(oldMessages => [...oldMessages, message]);
    });
  }, [socket]);

  const sendMessage = useCallback(() => {
    console.log('teste');
  }, []);

  return (
    <Container>
      <ChatList users={users} />
      <Chat>
        <Form onSubmit={sendMessage}>
          <Messages>
            {messages.map(m => (
              <p>{m}</p>
            ))}
          </Messages>

          <Input name="teste2" />

          <Button
            onClick={() => {
              socket.emit('message', 'message');
            }}
          >
            Enviar
          </Button>
        </Form>
      </Chat>
    </Container>
  );
}
