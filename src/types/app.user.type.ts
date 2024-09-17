// import { UserModel } from 'db/rdb/models/user.model';
import { InferAttributes } from 'sequelize';

export type UserMongo = {
  email: string;
  name: string;
};


export type UserWithTimeStamps = {
  id: string,
  username: string|null,
  email: string|null,
  phone: string,
  avatar_url: string|null,
  country: string|null,
  currency_id: string|null,
  status: string|null,
  guest: boolean|null,
  createdAt?: string;
  updatedAt?: string;
};

export type UserUpdate = {
  username?: string|null,
  email?: string|null,
  password?: string|null,
  phone?: string,
  otp?: string|null,
  otp_expires_at?: string|null,
  providers?: UserProviders,
  google_id?: string|null,
  facebook_id?: string|null,
  apple_id?: string|null,
  profile_image_url?: string|null,
  avatar_url?: string|null,
  createdAt?: string,
  updatedAt?: string,
}

export type UserAllDataTypes = UserWithTimeStamps & {
  password: string|null,
  otp: string|null,
  otp_expires_at: string|null,
  providers: UserProviders,
  google_id: string|null,
  facebook_id: string|null,
  apple_id: string|null,
  profile_image_url: string|null,
  avatar_url: string|null,
}

export type UserBalance = {
  id: string,
  user_id: string,
  cash_balance: number,
  coin_balance: number,
};

export type UserProfileResponse = {
  id: string,
  username: string|null,
  email: string|null,
  phone: string,
  country: string|null,
  currency: string,
  profile_image_url: null,
  avatar_url: string|null,
  status?: string,
  guest?: boolean,
  createdAt?: string,
  balance: {
    cash_balance: number,
    coin_balance: number,
  },
  tier: null|{
    id: string,
    name: string
  }
};

export type AnyStringKeyValuePair = {
  [key: string]: string;
}

export type UserProviders = {
  [key:string] : {
    uid: string;
    username: string;
    email: string;
    phone: string;
  }
}[]

export type SocialAuthProviders = 'google'|'facebook'|'apple'