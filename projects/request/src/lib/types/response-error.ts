export interface ResponseError<T> {
  serviceName?: string;
  operation?: string;
  result?: T
}
