import React from "react";
import { useRouter } from "next/router";
import md5 from "md5";
import { useRequest } from "ahooks";
import { fether } from "../utils/fether";
import { getStorage, setStorage } from "../utils/localStorage";
import styled from "styled-components";
import Image from "next/image";
import Public from "../assets/images/public.png";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;

  .loading {
    position: relative;
    width: 30px;
    height: 30px;
    border: 2px solid #000;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-right-color: rgba(0, 0, 0, 0.2);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-radius: 100%;

    animation: circle infinite 0.75s linear;
    @keyframes circle {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .png {
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
`;

const login = () => {
  const router = useRouter();
  const requestLogin = async () => {
    let token = router.asPath.split("?token=")[1],
      sign = "";
    if (getStorage("token")) {
      sign = getStorage("sign");
    } else {
      sign = md5(token);
    }
    let result = await fether(
      "login/",
      {
        userAgent: navigator.userAgent,
        token,
        sign,
      },
      "post"
    );
    if (result.code === 200) {
      setStorage("sign", sign);
      setStorage("token", token);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  const { data, loading } = useRequest(requestLogin, {
    cacheKey: "login-flag",
  });

  if (!data && loading) {
    return (
      <Wrap>
        <div className="loading"></div>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <div className="public">
        <div>
          登录成功🎉,
          <br />
          关注官方公众号下单就送奈飞节点
        </div>
        <div className="png">
          <Image
            style={{ margin: "auto" }}
            src={Public}
            width={200}
            height={200}
            alt="public"
          />
        </div>
      </div>
    </Wrap>
  );
};

export default login;
