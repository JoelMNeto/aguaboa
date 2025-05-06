export interface HttpConfig {
  endpoint: string;
  body?: { [key: string]: any };
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
}
