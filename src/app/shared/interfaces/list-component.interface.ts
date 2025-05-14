export interface Pagination {
  size?: number;
  page?: number;
  sort?: string;
}

export type ColorOptions = 'primary' | 'accent' | 'success' | 'danger' | '';

export interface ListColumn {
  value: string;
  label: string;
  isAction?: boolean;
  tooltipMessage?: string;
  align?: 'center' | 'start' | 'end';
  icon?: string;
  color?: ColorOptions | ((row: any) => ColorOptions);
  format?: (value: any) => any;
  action?: (value: any) => void;
}
