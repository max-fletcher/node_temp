
import { UserMongo, User, UserWithTimeStamps, UserProviders } from '../types/app.user.type';
import { AppUserStatus } from '../constants/enums';

export function mapToUserModel(
  id: string,
  username: string|null,
  email: string|null,
  password: string|null,
  phone: string,
  otp: string|null,
  otp_expires_at: string|null,
  providers: UserProviders,
  google_id: string|null,
  facebook_id: string|null,
  apple_id: string|null,
  profile_image_url: string|null,
  avatar_url: string|null,
  country: string|null,
  currency_id: string|null,
  status: string|null,
  guest: boolean|null
): User {
  return {
    id: id,
    username: username ? username : null,
    email: email ? email : null,
    password: password ? password : null,
    phone: phone,
    otp: otp ? otp : null,
    otp_expires_at: otp_expires_at ? otp_expires_at : null,
    providers: providers,
    google_id: google_id ? google_id : null,
    facebook_id: facebook_id ? facebook_id : null,
    apple_id: apple_id ? apple_id : null,
    profile_image_url: profile_image_url ? profile_image_url : null,
    avatar_url: avatar_url ? avatar_url : null,
    country: country ? country : null,
    currency_id: currency_id,
    status: status ? status : AppUserStatus.ACTIVE,
    guest: guest ? guest : true,
  };
}

export function mapToAppUserAuthResponse(
  id: string,
  username: string|null,
  email: string|null,
  phone: string,
  avatar_url: string|null,
  country: string|null,
  currency_id: string|null,
  status: string|null,
  guest: boolean|null,
  createdAt?: string,
): UserWithTimeStamps {
  return {
    id: id,
    username: username ? username : null,
    email: email ? email : null,
    phone: phone,
    avatar_url: avatar_url ? avatar_url : null,
    country: country ? country : null,
    currency_id: currency_id,
    status: status ? status : AppUserStatus.ACTIVE,
    guest: guest ? guest : true,
    createdAt: createdAt,
  };
}

export function mapToMongoUser(email: string, name: string): UserMongo {
  return {
    email: email,
    name: name,
  };
}