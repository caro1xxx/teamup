class CommonErrorcode:
    serverError = {'code':500,'message':'服务端错误'}
    paramsError = {'code':403,'message':'参数错误'}

class RegisterResponseCode:
    success = {'code':200,'message':'注册成功'}
    userExists = {'code':401,'message':'该用户名已被注册'}
    emailExists = {'code':402,'message':'该邮箱已被注册'}
    emailError = {'code':402,'message':'邮箱格式错误'}
    emailCodeSuccess = {'code':200,'message':'验证码已发送至邮箱'}
    codeError = {'code':402,'message':'验证码错误'}
    