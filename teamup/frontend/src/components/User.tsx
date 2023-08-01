import React from "react";
import styled from "styled-components";
import Avator from "../assets/avator/guest.png";
import Logout from "../assets/images/logout.png";
type Props = {};

const Wrap = styled.div`
  background-color: #0e0e10;
  height: 5vh;
  margin: 1vh 0px;
  width: 95%;
  border-radius: 0px 10px 10px 0px;
  display: flex;
  .avator {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    width: 20%;
    img {
      height: 3vh;
      width: 3vh;
    }
  }
  .username {
    flex: 1;
    font-size: 1vw;
    display: inline-flex;
    vertical-align: top;
    justify-content: start;
    align-items: center;
  }
  .logout {
    width: 20%;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    img {
      height: 2vh;
      width: 2vh;
    }
  }
`;

const User = (props: Props) => {
  return (
    <Wrap>
      <div className="avator">
        <img src={Avator} alt="avator" />
      </div>
      <div className="username">Jeff bezos</div>
      <div className="logout">
        <img src={Logout} alt="logout" />
      </div>
    </Wrap>
  );
};

export default User;
