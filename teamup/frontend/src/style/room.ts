import styled from "styled-components";

export const Wrap = styled.div`
  z-index: 2;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  position: relative;
  .empty {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 300px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 20px 10%;
  }
`;

export const BottomOptions = styled.div`
  position: absolute;
  bottom: 10px;
  height: 75px;
  width: 450px;
  .options {
    margin-top: 5px;
    display: flex;
  }
`;

export const ItemWrap = styled.div`
  cursor: pointer;
  user-select: none;
  background-color: #232323;
  border-radius: 5px;
  position: relative;
  height: 370px;
  .tags {
    font-size: 15px;
    margin: 20px 30px 10px 30px;
    font-weight: bolder;
    display: flex;
  }

  .options {
    position: absolute;
    bottom: 70px;
    left: 30px;
    display: flex;
    img {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
    div {
      font-size: 12px;
      flex: 1;
      color: #d5d5d5;
    }
  }
  .tag {
    position: absolute;
    bottom: 15px;
    margin: 0px 30px;
    margin-top: 10px;
  }
  .title {
    font-size: 15px;
    margin: 40px 30px 10px 30px;
    font-weight: bolder;
    display: flex;
    .roomid {
      color: #05b665;
      font-weight: lighter;
      font-size: 10px;
      flex: 1;
      display: inline-flex;
      justify-content: end;
      align-items: center;
    }
  }
  .description {
    height: 120px;
    font-size: 12px;
    line-height: 20px;
    margin: 20px 30px;
    font-weight: lighter;
    text-indent: 2em;
    color: #d5d5d5d1;
  }
  .people_list {
    display: flex;
    margin: 0px 30px;
    position: relative;
    .loading_avator {
      margin-top: 20px;
      margin-right: 10px;
    }
  }

  @keyframes newLoadinghighlight {
    from {
      background-color: #05b665;
      opacity: 0.5;
    }
    to {
      background-color: #232323;
      opacity: 1;
    }
  }
`;
