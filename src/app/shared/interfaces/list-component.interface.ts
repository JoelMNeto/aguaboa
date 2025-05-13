export interface Pagination {
  size?: number;
  page?: number;
  sort?: string;
}

export interface ListColumn {
  value: string;
  label: string;
  isAction?: boolean;
  tooltipMessage?: string;
  align?: 'center' | 'start' | 'end';
  icon?: string;
  color?: ('primary' | 'accent' | 'success' | 'danger') | ((row: any) => 'primary' | 'accent' | 'success' | 'danger');
  format?: (value: any) => any;
  action?: (value: any) => void;
}
