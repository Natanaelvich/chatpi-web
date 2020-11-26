import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  loading: number | undefined;
}

export const Container = styled.div<ContainerProps>`
  button {
    background: #343152;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #fff;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${shade(0.2, '#343152')};
    }
  }
  ${props =>
    props.loading &&
    css`
      button:disabled {
        background: ${shade(0.6, '#343152')};
        cursor: not-allowed;
      }
    `}
`;
