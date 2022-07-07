export interface IUser {
  id?: number;
  email: string;
  name: string;
  password?: string;
  theme?: string;
  language?: string;
  blocked?: boolean | null;
  admin?: boolean | null;
}
