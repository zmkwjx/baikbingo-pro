import { Method } from "axios";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface AxiosRequestStruct {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
}

export interface AxiosResponseStruct {
  data: any;
  headers: any;
  request?: any;
  status: number;
  statusText: string;
  config: AxiosRequestStruct;
}

// 定义接口
export interface AxiosPendingStruct {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}
