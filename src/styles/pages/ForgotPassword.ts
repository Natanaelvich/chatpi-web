import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  background: linear-gradient(270deg, #3f3a79 27.66%, #d56065 98.55%);
`;

const appearFromRight = keyframes`
from {
  opacity : 0;
  transform : translateX(50px);
}
to {
  opacity : 1;
  transform : translateX(0)
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 600px;
  margin: auto;
`;

export const BackGround = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 683px) {
    & {
      display: none;
    }
  }
`;
export const Logo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 683px) {
    & {
      display: none;
    }
  }
`;
