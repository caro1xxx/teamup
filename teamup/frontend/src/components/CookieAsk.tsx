import React from "react";
import { AskWrap } from "../style/other";
import "../style/custome_antd.css";
import { setStorage } from "../utils/localstorage";
type Props = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const CookieAsk = (props: Props) => {
  const handle = (type: number) => {
    if (type === 2) {
      props.close(false);
    } else {
      setStorage("agreeCookiePotoce", "true");
      props.close(false);
    }
  };
  return (
    <AskWrap>
      <div>
        我们使用必要的 cookie
        来使我们的网站正常运行。经您同意，我们还可能使用非必要的 cookie
        来改善用户体验和分析网站流量。单击“接受”即表示您同意我们网站使用
        Cookie， 如我们的Cookie
        政策中所述。您可以随时单击“首选项”来更改您的cookie 设置。
      </div>
      <div className="btotbn">
        <div className="btn" onClick={() => handle(1)}>
          接受
        </div>
        <div className="btn_error" onClick={() => handle(1)}>
          拒绝
        </div>
        <div className="hulu" onClick={() => handle(2)}>
          忽略
        </div>
      </div>
    </AskWrap>
  );
};

export default CookieAsk;
