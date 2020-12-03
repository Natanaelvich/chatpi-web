import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  focused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: rgba(0, 0, 0, 0.5);
  transition: border 0.2s;
  padding: 16px;
  width: 100%;
  color: #fff;
  border-radius: 10px;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.focused &&
    css`
      color: #de595c;
      border-color: #de595c;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #de595c;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #89748a;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0.9) inset !important;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: #f4ede8 !important;
  }

  > svg {
    margin-right: 16px;
    transition: color 0.2s;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  height: 20px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
