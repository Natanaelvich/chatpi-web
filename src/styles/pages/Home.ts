import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: row;
    margin-top: 26px;
    > a {
      font-size: 20px;
      font-weight: bold;
      color: #343152;
      display: block;
      margin-right: 12px;
      border: 1px solid #fff;
      padding: 12px;
      border-radius: 6px;
    }
  }
  form {
    label {
      font-size: 20px;
      font-weight: bold;
      color: #de595c;
      display: block;
    }
    input {
      padding: 12px;
      border-radius: 6px;
    }
    button {
      margin-left: 12px;
      padding: 12px 20px;
      border-radius: 6px;
      background: #de595c;
      color: #fff;
    }
  }
`;
export const Title = styled.h1`
  font-size: 45px;
  color: #de595c;
  font-weight: bold;
`;
export const List = styled.ul`
  background: #1d2125;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 0px 17px -5px rgba(0, 0, 0, 0.75);
  li {
    font-size: 26px;
    color: #fff;
    margin-bottom: 12px;
  }
`;
