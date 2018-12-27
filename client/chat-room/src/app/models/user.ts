export class User {
  token: string;
  nickname: string;
  _id: string;
}

export class UserForm {
  nickname: string;
  password?: string;
  email?: string;
}
