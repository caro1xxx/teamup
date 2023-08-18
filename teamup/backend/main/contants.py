class CommonErrorcode:
    serverError = {'code': 500, 'message': '服务端错误'}
    paramsError = {'code': 403, 'message': '参数错误'}
    illegallyError = {'code': 405, 'message': '非法'}
    authError = {'code': 410, 'message': 'Unauthorized'}
    mismatch = {'code': 411, 'message': '匹配失败'}


class RegisterResponseCode:
    success = {'code': 200, 'message': '注册成功'}
    userExists = {'code': 401, 'message': '该用户名已被注册'}
    emailExists = {'code': 402, 'message': '该邮箱已被注册'}
    emailError = {'code': 402, 'message': '邮箱格式错误'}
    emailCodeSuccess = {'code': 200, 'message': '验证码已发送至邮箱'}
    emailSendSuccess = {'code': 200, 'message': '@消息已发送至对方邮箱'}
    emailAiteUserError = {'code': 403, 'message': '@用户错误'}
    codeError = {'code': 402, 'message': '验证码错误'}


class LoginResponseCode:
    tokenToInfoSuccess = {'code': 200, 'message': '获取成功'}
    tokenExpires = {'code': 409, 'message': 'access_token过期'}
    usernameOrPasswordError = {'code': 404, 'message': '用户名或密码错误'}
    loginSuccess = {'code': 200, 'message': '登录成功'}


class RoomResponseCode:
    getSuccess = {'code': 200, 'message': '获取成功'}
    createdSuccess = {'code': 200, 'message': '创建房间成功'}
    joinSuccess = {'code': 200, 'message': '加入车队成功'}
    joinError = {'code': 403, 'message': '加入车队失败'}
    roomOrUserNotFound = {'code': 404, 'message': '车队或用户不存在'}
    quitSuccess = {'code': 200, 'message': '退出车队成功'}
    quitError = {'code': 411, 'message': '队长禁止退出'}
    fleetDepartureed = {'code': 409, 'message': '车队已发车'}
    fleetDepartureSuccess = {'code': 200, 'message': '发车成功'}
    fleetDepartureError = {'code': 403, 'message': '发车失败'}
    joinErrorMax = {'code': 403, 'message': '当前车队已满员'}
    joinRepet = {'code': 201, 'message': '重复加入'}
    quitErrorNotFound = {'code': 404, 'message': '未加入该车队'}
    quitErrorDepartureed = {'code': 400, 'message': '已发车,无法退出'}
    notDeparture = {'code': 412, 'message': '未发车'}


class ChatResponseCode:
    connectSuccess = {'code': 200, 'message': '连接成功'}
    chatNoFound = {'code': 404, 'message': '房间不存在'}
    forwardMessageSuccess = {'code': 200, 'message': '转发成功'}


class PayStateResponseCode:
    teamAllPayOrder = {'code': 200, 'message': '获取队伍支付状态成功'}
    flushSuccess = {'code': 200, 'message': '二维码刷新成功'}
    flushError = {'code': 413, 'message': '刷新失败,用户不在该车队'}


class PayResponseCode:
    duplicatePay = {'code': 201, 'message': '订单已被支付'}
    paySuccess = {'code': 200, 'message': '支付成功'}
    payError = {'code': 415, 'message': '支付失败'}


class TypeInfoResponseCode:
    typeNotFound = {'code': 404, 'message': "该类型不存在"}
