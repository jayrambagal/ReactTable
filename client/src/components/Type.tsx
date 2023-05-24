export interface IAddress {
    street: string;
  }
    export interface IUser {
      id?: number;
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
      width?:string;
      accessor?:string
      
    }

