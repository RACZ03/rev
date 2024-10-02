export interface ResponseI<T> {
  status: string;
  message: string;
  accessToken?: string;
  data: T;
}
