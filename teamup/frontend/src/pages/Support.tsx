import React from "react";
import { Divider, Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;
type Props = {};

const Support = (props: Props) => {
  return (
    <div style={{ margin: "100px 50px 0px 50px" }}>
      <Typography>
        <Title level={4}>帮助 - 参加问卷调查补充问题</Title>

        <Title level={5}>发车常见问题</Title>
        <Paragraph>· 支付通道繁忙</Paragraph>
        <Paragraph>
          由于平台当前下单人数过多,这是服务器保护策略.解决办法:稍后再试或联系客服申请发车
        </Paragraph>
        <Paragraph>· 发车失败,请联系客服</Paragraph>
        <Paragraph>
          当前车队人员异常,解决办法:重新创建车队 或 踢出异常成员
        </Paragraph>
        <Paragraph>· 支付成功但是没有显示出来</Paragraph>
        <Paragraph>
          造成该结果的原因是因为该二维码即将到期,您在二维码到期的时候付款了,导致服务器未收到微信支付通知.
          <Paragraph>
            解决办法:联系客服 提供一下信息:
            <ul>
              <li>
                <Link>Tmeaup用户名和邮箱</Link>
              </li>
              <li>
                <Link>微信支付截图</Link>
              </li>
              <li>
                <Link>车队编号</Link>
              </li>
            </ul>
          </Paragraph>
        </Paragraph>
        <Paragraph>· 流媒体会员账号密码错误</Paragraph>
        <Paragraph>
          因车队其他用户修改了密码导致的,解决办法:点击Teamup网站 -
          右上角个人头像 - 订单
          -修改密码.完成以上操作后系统将会修改会员账号,将新密码推送到车队成员邮箱中
        </Paragraph>
        <Paragraph>· 会员价格计算</Paragraph>
        <Paragraph>
          当前车队容纳最大人数 - 总价 =
          单价.意味着该车队入队的成员越多,最终购买会员的价格就越低
        </Paragraph>
        <Paragraph>· 折扣码提示已使用</Paragraph>
        <Paragraph>
          当你在支付之前使用折扣码后,不管你是否支付这个订单,该折扣码都将被标记为已使用.所以请确认好是否需要支付该订单再使用折扣码
        </Paragraph>
        <Paragraph>· 账号被挤</Paragraph>
        <Paragraph>
          请谨慎保管座位码,一般情况是座位码泄露导致的该问题,可以联系客服修改座位码
        </Paragraph>
      </Typography>
      <Title level={5}>没有找到解决办法?</Title>
      <Paragraph>关注微信公众号:bezos的小屋 联系客服解决问题</Paragraph>
    </div>
  );
};

export default Support;
