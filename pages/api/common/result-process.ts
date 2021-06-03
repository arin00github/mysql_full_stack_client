export interface Response<T> {
  //count: number;
  results?: T;
}

export interface ResultMessage<T> {
  code: number;
  message: string;
  responseTime: string;
  response?: Response<T>;
}

// Response에 results 없이 바로 결과값 나오는 경우 사용
export interface ResponseMessage<T> {
  code: number;
  message: string;
  responseTime: string;
  response?: T;
}
