class UserMsg():
  userNotFound = {'code':404,'msg':'该用户未注册'}
  passwordOrUsernameError =  {'code':400,'msg':'账号或密码错误'}
  userBan = {'code':401,'msg':'用户被封禁'}
  success = {'code': 200, 'msg': '登陆成功'}

  missParams = {'code': 404, 'msg': '请输入'}
  errorEmail = {'code': 403, 'msg': '邮箱无效'}
  usernameRepeat = {'code': 405, 'msg': '用户名已被注册'}
  errorIp = {'code': 406, 'msg': 'ip错误'}
  registerSucess = {'code': 200, 'msg': '注册成功'}