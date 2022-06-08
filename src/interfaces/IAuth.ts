export interface IAuthContext {
  auth: IAuth;
  setAuth: (auth: IAuth) => void;
  loading: boolean;
  logout: () => void;
}

export interface IAuth {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface ILoginRes {
  data: IAuth;
}

export const defaultAuthContext: IAuthContext = {
  auth: {
    _id: '',
    name: '',
    email: '',
    token: '',
  },
  setAuth: (auth: IAuth) => {
    defaultAuthContext.auth = auth;
  },
  loading: false,
  logout: () => {
    defaultAuthContext.setAuth({
      _id: '',
      name: '',
      email: '',
      token: '',
    });
  },
};
