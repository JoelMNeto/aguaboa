export interface HttpConfig {
  endpoint: string;
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
}
