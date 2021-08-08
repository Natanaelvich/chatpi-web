import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  overflow: auto;
  background: linear-gradient(270deg, #3f3a79 27.66%, #d56065 98.55%);
`;
export const Content = styled.div`
  display: flex;

  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 1020px;
  margin: auto;
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
  flex: 1;
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

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      label {
        font-size: 21px;
        input {
          margin-left: 12px;
        }
      }
    }
    select {
      margin-top: 12px;
      width: 100%;
      border: 1px solid #777;
      border-radius: 0.25em;
      padding: 0.39em 0.5em;
      font-size: 1.25rem;
      cursor: pointer;
      line-height: 1.1;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      option {
        background-color: #fff;
        color: #333333;
      }
    }
  }

  > a {
    color: #ffff;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
export const Background = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
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
  display: none;

  @media (max-width: 768px) {
    & {
      display: block;
    }
  }
`;
