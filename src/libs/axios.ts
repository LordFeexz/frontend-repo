import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { BaseResponse } from "@/interfaces/request";
import type { IPaginationProps } from "@/interfaces";

export interface Query {
  url: string;
  headers?: any;
  params?: any;
}

export interface Mutation {
  url: string;
  headers?: any;
  params?: any;
  method: "POST" | "PATCH" | "DELETE" | "PUT";
  data?: any;
}

class ThirdPartyRequest {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BACKEND_BASE_URL,
      validateStatus: (s) => s >= 200,
    });
  }

  public async Query<T = any>({
    url,
    headers,
    params,
  }: Query): Promise<
    AxiosResponse<BaseResponse<T> & Partial<IPaginationProps>>
  > {
    return this.client<BaseResponse<T> & Partial<IPaginationProps>>({
      url,
      headers,
      method: "GET",
      params,
    });
  }

  public async Mutation<T = any>({
    url,
    headers,
    data,
    method,
    params,
  }: Mutation): Promise<AxiosResponse<BaseResponse<T>>> {
    return this.client<BaseResponse<T>>({
      url,
      headers,
      method,
      data,
      params,
    });
  }
}

const request = new ThirdPartyRequest();

export default request;
