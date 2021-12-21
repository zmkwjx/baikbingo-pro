import mockDataInfo from "./data/user/info.json";

const login = {
  url: "/mock/login",
  method: "post",
  response: (params: any) => {
    const { username, password } = params.body;
    if (username && password) {
      if (
        username === "root" &&
        password === "e10adc3949ba59abbe56e057f20f883e"
      ) {
        return {
          code: 200,
          msg: "success",
          data: mockDataInfo
        };
      }
      return {
        code: 400,
        msg: "账号或者密码错误"
      };
    }
    return {
      code: 400,
      msg: "参数为空"
    };
  }
};

const mock = [];
mock.push(login);
export default mock;
