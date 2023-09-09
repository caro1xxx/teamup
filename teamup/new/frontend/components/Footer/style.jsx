import styled from "styled-components";

export const Wrap = styled.div`
  height: 100px;
  width: 1000px;
  color: #e7e7e795;
  margin: 200px auto 50px auto;
  font-size: 14px;
  display: flex;
  .wrap {
    width: 20%;
    text-align: start;
    > div {
      margin-bottom: 10px;
    }
  }
  .title {
    font-size: 18px;
    color: #eb3329;
    font-weight: bolder;
  }
`;

export const Logos = styled.div`
  width: 1000px;
  margin: 0px auto 10px auto;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  color: #e7e7e795;
`;
