export interface Pagination {
  size?: number;
  page?: number;
  sort?: string;
}

export interface ListColumn {
  value: string;
  label: string;
  align?: 'center' | 'start' | 'end';
  icon?: string;
  format?: (value: any) => any;
  action?: (value: any) => void;
}