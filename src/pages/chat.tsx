import { useAuth } from '@/hooks/modules/AuthContext';
import { Chat, Messages } from '@/styles/Chat/styles';
import React, { useMemo } from 'react';
import io from 'socket.io-client';
import { Container } from '../styles/SingnIn/styles';

export default function ChatHome() {
  const { user } = useAuth();

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_API_KEY, {
      query: { user: user.id },
    });
  }, [user]);

  return (
    <Container>
      <Chat>
        <input />

        <Messages />

        <input />

        <button
          type="button"
          onClick={() => {
            socket.emit('message', 'message');
          }}
        >
          Enviar
        </button>
      </Chat>
    </Container>
  );
}
