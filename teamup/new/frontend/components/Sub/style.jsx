import styled from "styled-components";
export const Wrap = styled.div`
  margin: 50px 0px;
  width: 100%;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .sub {
    display: flex;
    .input {
      border: none;
      background: linear-gradient(to right, #eb33293c, #96262654);
      outline: none;
      width: 500px;
      border-radius: 10px;
      padding: 15px 10px;
    }
    .btn {
      color: #fff;
      height: 50px;
      margin: 0px 10px;
      width: 70px;
      text-align: center;
      border-radius: 10px;
      line-height: 50px;
      cursor: pointer;
      background: linear-gradient(to right, #eb3329, #962626);
    }
    .btn:hover {
      background: linear-gradient(to right, #eb3329a4, #96262673);
    }
  }
  .public {
    margin-left: 70px;
  }
`;
