class CommonErrorcode:
    serverError = {'code': 500, 'message': '服务端错误'}
    paramsError = {'code': 403, 'message': '参数错误'}
    illegallyError = {'code': 405, 'message': '非法'}


class RegisterResponseCode:
    success = {'code': 200, 'message': '注册成功'}
    userExists = {'code': 401, 'message': '该用户名已被注册'}
    emailExists = {'code': 402, 'message': '该邮箱已被注册'}
    emailError = {'code': 402, 'message': '邮箱格式错误'}
    emailCodeSuccess = {'code': 200, 'message': '验证码已发送至邮箱'}
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
    quitSuccess = {'code': 200, 'message': '退出房间成功'}
