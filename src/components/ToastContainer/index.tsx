import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { useToast, ToastMessage } from '../../hooks/modules/ToastContext';
import Toast from '../Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const { removeToast } = useToast();

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <Container messageLength={messages.length}>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast
          key={key}
          message={item}
          style={props}
          removeToast={removeToast}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
