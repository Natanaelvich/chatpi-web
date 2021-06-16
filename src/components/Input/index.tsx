import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons/lib';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  name: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [focused, setFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleInputBluer = useCallback(() => {
    setFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      data-testid="input-container"
      isErrored={!!error}
      isFilled={isFilled}
      focused={focused}
      style={containerStyle}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={onFocus}
        onBlur={handleInputBluer}
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
