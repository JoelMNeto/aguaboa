export interface Pagination {
  size?: number;
  page?: number;
  sort?: string;
}

export interface ListColumn {
  value: string;
  label: string;
  align?: 'center' | 'start' | 'end';
  format?: (value: any) => any;
}