import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;

  .title {
    margin-top: 70px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background-image: linear-gradient(
      to right,
      #eb3329,
      #962626
    ); /* 渐变颜色设置 */
    -webkit-background-clip: text; /* 将文字作为背景图像剪切 */
    color: transparent; /* 隐藏文字本身的颜色 */
    cursor: pointer;
    user-select: none;
  }
  .body {
    cursor: pointer;
    user-select: none;
    overflow-x: scroll;
    width: 1200px;
    white-space: nowrap; /* 防止内容换行 */
    scrollbar-width: none;

    .item {
      position: relative;
      display: inline-block;
      width: 220px;
      padding: 20px;
      border-radius: 10px;
      .stock {
        font-size: 10px;
        position: absolute;
        right: 10px;
      }
      .top {
        display: flex;
      }
      .logo {
        width: 20px;
        height: 20px;
      }
      .price {
        font-size: 30px;
        font-weight: bolder;
        margin: 10px 0px;
      }
      .choose {
        color: white;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        background: linear-gradient(to right, #eb3329, #962626);
      }
      .feature {
        cursor: pointer;
        user-select: none;
        margin: 10px 0px;
        > div {
          margin-bottom: 5px;
        }
        .support {
          color: #eb3329;
          font-weight: bolder;
          background-image: linear-gradient(
            to right,
            #eb3329,
            #962626
          ); /* 渐变颜色设置 */
          -webkit-background-clip: text; /* 将文字作为背景图像剪切 */
          color: transparent; /* 隐藏文字本身的颜色 */
        }
        .nosupport {
          color: #838383;
          font-weight: bolder;
        }
      }
    }
    .item:hover {
      background-color: #e8e8e8c5;
    }
    .choose:hover {
      color: #000;
      background: #fff;
    }
  }
  .body::-webkit-scrollbar {
    width: 0.5rem; /* 设置滚动条宽度，可以根据需要调整 */
  }
  /* 隐藏滚动条滑块 */
  .body::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const ToFowrad = styled.div`
  position: absolute;
  right: ${(props) => (props.$orientations === 1 ? "-30px" : "")};
  left: ${(props) => (props.$orientations === 0 ? "-30px" : "")};
  bottom: 20px;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  top: 0px;
  cursor: pointer;
  user-select: none;
  animation: ${(props) =>
    props.$orientations === 1
      ? "infinite 0.8s moveRight"
      : "infinite 0.8s moveLeft"};
  @keyframes moveRight {
    from {
      right: -30px;
    }
    to {
      right: -40px;
    }
  }

  @keyframes moveLeft {
    from {
      left: -30px;
    }
    to {
      left: -40px;
    }
  }
`;
