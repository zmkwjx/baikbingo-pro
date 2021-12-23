import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import { AxiosPendingStruct } from "@/types";

// NProgress 配置
NProgress.configure({
  showSpinner: false
});

// 取消重复请求
const pending: Array<AxiosPendingStruct> = [];
const { CancelToken } = axios;

// axios 实例
const instance = axios.create({
  timeout: 10000,
  responseType: "json"
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (let i = 0; i < pending.length; i += 1) {
    const item: number = +i;
    const list: AxiosPendingStruct = pending[i];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel("操作太频繁，请稍后再试");
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

// 报错提示
const sendMessage = (msg: any) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: "error"
  });
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    NProgress.start();
    removePending(request);
    request.cancelToken = new CancelToken((e) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: e
      });
    });
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    removePending(response.config);
    // 获取状态码
    const status = response.data.code || response.status;
    const message = response.data.msg || "未知错误";
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      sendMessage(message);
      return Promise.reject(new Error(message));
    }
    return response;
  },
  (error) => {
    NProgress.done();
    const { response } = error;

    // 超时重新请求
    const { config } = error;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount += 1;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }

    // eslint-disable-next-line
    return Promise.reject(response || {message: error.message});
  }
);

export default instance;
