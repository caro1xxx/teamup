import React from "react";
import { Input, Button } from "antd";
import { SelfWrap } from "../../style/mod";
import { fecther } from "../../utils/fecther";
import { useAppDispatch } from "../../redux/hooks";
import { changeMessage } from "../../redux/modules/notifySlice";
type Props = {
  open: () => void;
};

const SelfMail = (props: Props) => {
  const [UserMail, setUserMail] = React.useState({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const saveUserMail = async () => {
    if (UserMail.email === "" || UserMail.password === "") return;
    let result = await fecther(
      `usermail/?mail=${UserMail.email}&pwd=${UserMail.password}`,
      {},
      "get"
    );
    if (result.code !== 200) {
      dispatch(changeMessage([result.message, false]));
    } else {
      localStorage.setItem("selfMail", UserMail.email);
      localStorage.setItem("selfPassword", UserMail.password);
      props.open();
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("selfMail") === null) return;
    setUserMail({
      // @ts-ignore
      email: localStorage.getItem("selfMail"),
      // @ts-ignore
      password: localStorage.getItem("selfPassword"),
    });
  }, []);

  return (
    <SelfWrap>
      <div>
        <Input
          placeholder="需要注册会员的邮箱"
          value={UserMail.email}
          onChange={(e) => setUserMail({ ...UserMail, email: e.target.value })}
        />
      </div>
      <div>
        <Input
          placeholder="自定义密码"
          type="password"
          value={UserMail.password}
          onChange={(e) =>
            setUserMail({ ...UserMail, password: e.target.value })
          }
        />
      </div>
      <div className="hint">
        温馨提醒:您现在所填的邮箱和密码就是成功发车后的会员账号密码
      </div>
      <Button className="create" onClick={saveUserMail}>
        确定无误
      </Button>
    </SelfWrap>
  );
};

export default SelfMail;
