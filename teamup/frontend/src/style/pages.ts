import styled from "styled-components";
export const StoreWrap = styled.div`
  margin: 40px 0px;
  .title {
    text-align: center;
    font-size: 20px;
    background: linear-gradient(to right, #259acc, #05b665);
    -webkit-background-clip: text;
    color: transparent;
    user-select: none;
    cursor: pointer;
  }
  .plan {
    margin: 20px 0px;
    .logo {
      width: 30px;
      margin: 10px 0px;
    }
    .render_item {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 30px;
      grid-row-gap: 10px;
      .item {
        cursor: pointer;
        user-select: none;
        background-color: #2e302f;
        border-radius: 5px;
        .plantitle {
          height: 40px;
          background-color: #272827;
          font-weight: bolder;
          font-style: italic;
          border-radius: 5px 5px 0px 0px;
          text-align: center;
          line-height: 40px;
        }
        .wrap {
          padding: 20px;
          .items {
            margin: 10px 0px;
            font-size: 14px;
            > span {
              color: #05b665;
              margin-right: 5px;
            }
          }
          .buy {
            background-color: #05b665;
            border-radius: 50px;
            margin-bottom: 10px;
            width: 100%;
            margin-top: 20px;
            text-align: center;
            border: none;
          }
          .buy:hover {
            background-color: #2a9263ac;
            border-radius: 50px;
            margin-bottom: 10px;
            width: 100%;
            margin-top: 20px;
            text-align: center;
          }
        }
      }
    }
  }
`;

export const ActivityWrap = styled.div`
  margin: 50px 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    margin: 20px 0px;
  }
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    color: white;
  }
`;
