import styled, { css } from 'styled-components';

interface ContainerProps {
  messageLength: number;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;

  ${props =>
    props.messageLength === 0 &&
    css`
      display: none;
    `}
`;
