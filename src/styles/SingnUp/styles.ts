import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
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
    display: flex;
    flex-direction: column;
    label {
      font-size: 21px;
      margin-right: 12px;
      align-self: flex-start;
      margin-top: 12px;
      input {
        margin-left: 12px;
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
  max-width: 700px;
`;
