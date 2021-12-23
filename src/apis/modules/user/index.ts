import request from "@/apis/request";

export default {
  login: (data: any) => {
    return request.post("/mock/login", data);
  }
};
