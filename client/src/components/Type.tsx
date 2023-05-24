export interface IAddress {
  street: string;
}
export interface IUser {
  id?: any;
  name?: string;
  username?: string;
  address?: IAddress;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  status?: string;
  last_login?: string;
  role?: string;
  view?: React.ReactNode;
  width?: string;
  accessor?: string;
}

export interface FormData {
  id?: number;
  name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  status?: boolean | undefined | string;
  last_login?: string;
  role?: string;
  view?: React.ReactNode;
  width?: string;
  accessor?: string;
}

export interface TableProps<T extends object> {
  columns: any[];
  data: T[];
  onDelete?: (id: number) => void;
  page?: any[];
  nextPage?: () => void;
  previousPage?: () => void;
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  pageIndex?: number;
  state?: any;
  onCreateUser?: (newUser: FormData) => void;
}
