import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  overflow: auto;
  background: linear-gradient(270deg, #3f3a79 27.66%, #d56065 98.55%);
  height: 100vh;
  width: 100vw;

  > header {
    height: 144px;
    background: #312d5e;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  width: 100%;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 20px;
      text-align: left;
      margin-top: 24px;
      margin-bottom: 12px;
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
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  .profile-image {
    border-radius: 50%;
    width: 186px;
    height: 186px;
    background: red;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
