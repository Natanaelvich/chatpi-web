import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromLeft = keyframes`
from {
  opacity : 0;
  transform : translateX(-50px);
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

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      font-size: 41px;
      margin-bottom: 24px;
      font-family: 'Redressed', serif;
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
    color: #de595c;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#DE595C')};
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
  max-width: 700px;
`;
export const BackGround = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

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
  justify-content: flex-start;

  @media (min-width: 683px) {
    & {
      display: none;
    }
  }
`;
