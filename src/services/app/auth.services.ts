
import { mapToUserModel } from '../../mapper/user.mapper';
import { createUserBalanceId, createUserId/*, generateOtp*/ } from '../../utils/id.utils';
import { UserMongoRepository } from '../../db/nosql/repository/user.repository';
import { SocialAuthProviders, UserUpdate } from '../../types/app.user.type';
import { CustomException } from '../../errors/CustomException.error';
import { mapToUserBalanceModel } from '../../mapper/user-balance.mapper';
import { datetimeYMDHis } from '../../utils/datetime.utils';
import { formatLoginAppUserData } from '../../formatter/format-app-data.formatter';

export class AuthService {
  private userMongoRepo: UserMongoRepository;

  constructor() {
    this.userMongoRepo = new UserMongoRepository();
  }

  async loginWithPhone(phone: string) {
    // const user: UserWithTimeStamps = await this.userRepo.findUserByPhone(phone);
    // const otp = generateOtp();
    const user= false;

    if (!user) {
      const id = createUserId();
      const newUser = mapToUserModel(
        id,
        null,
        null,
        null,
        phone,
        // otp,
        null,
        null,
        [],
        null,
        null,
        null,
        null,
        null,
        'Australia',
        'AUD',
        null,
        null
      );

      const balance_id = createUserBalanceId();
      const newUserBalance = mapToUserBalanceModel(balance_id, id);
      // const createdUser: UserWithTimeStamps = await this.userRepo.createUser(newUser, newUserBalance);
      const createdUser = false;

      if(!createdUser)
        throw new CustomException('Failed to store user. Please try again.', 500);

      // const userData = await this.userRepo.getUserProfile(id);
      const userData = false;

      const formattedData = formatLoginAppUserData(userData) // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

      return {
        data: formattedData,
        authenticated: true,
        message: 'Login Successful',
        status: 201,
      };
    }

    // await this.userRepo.setOtp(user.id, otp);
    // const userData = await this.userRepo.getUserProfile(user.id);
    const userData = false;

    const formattedData = formatLoginAppUserData(userData); // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

    return {
      data: formattedData,
      authenticated: true,
      message: 'Login Successful',
      status: 200,
    };
  }

  async nullifyUserOtp(id: string) {
    // await this.userRepo.nullifyUserOtp(id);
    return true;
  }

  async loginSocialUser(provider: SocialAuthProviders, data: any){ // # Might need to change type from any to something meaningful later
    // let userExists: UserAllDataTypes = await this.userRepo.findUserByProviderID(provider, data.uid);
    let userExists = false;

    if(userExists){
      // const userData = await this.userRepo.getUserProfile(userExists.id);
      const userData = false;
      const formattedData = formatLoginAppUserData(userData); // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

      return {
        data: formattedData,
        authenticated: true,
        message: 'Google Login Successful',
        status: 200,
      };
    }

    // userExists = await this.userRepo.findUserByEmail(data.email);
    userExists = false;

    if(userExists){
      const updateUser: UserUpdate = {
        // username: userExists.username ?? data.displayName,
        providers: [
          // ...userExists.providers,
          {
            [provider]: {
              uid: data.uid,
              username: data.displayName,
              email: data.email,
              phone: data.phoneNumber,
            }
          }
        ],
        // google_id: userExists.google_id ?? (provider === 'google' ? data.uid : null),
        // facebook_id: userExists.facebook_id ?? (provider === 'facebook' ? data.uid : null),
        // apple_id: userExists.apple_id ?? (provider === 'apple' ? data.uid : null),
        // profile_image_url: userExists.profile_image_url ?? data.photoURL,
        // avatar_url: userExists.avatar_url ?? data.photoURL,
        updatedAt: datetimeYMDHis(),
      };

      // await this.userRepo.updateUser(updateUser, userExists.id);
      // const userData = await this.userRepo.getUserProfile(userExists.id);
      // const userData = false;
      // const formattedData = formatLoginAppUserData(userData); // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

      return {
        // data: formattedData,
        authenticated: true,
        message: 'Google Login Successful',
        status: 200,
      };
    }

    const id = createUserId();
    const newUser = mapToUserModel(
      id,
      data.displayName,
      data.email,
      null,
      data.phone,
      null,
      null,
      [
        {
          [provider]: {
            uid: data.uid,
            username: data.displayName,
            email: data.email,
            phone: data.phoneNumber,
          }
        }
      ],
      provider === 'google' ? data.uid : null,
      provider === 'facebook' ? data.uid : null,
      provider === 'apple' ? data.uid : null,
      data.photoURL,
      data.photoURL,
      null,
      'AUD',
      null,
      null
    );

    const balance_id = createUserBalanceId();
    const newUserBalance = mapToUserBalanceModel(balance_id, id);
    // const createdUser: UserWithTimeStamps = await this.userRepo.createUser(newUser, newUserBalance);
    const createdUser = false;

    if(!createdUser)
      throw new CustomException('Failed to store user. Please try again.', 500);

    // const userData = await this.userRepo.getUserProfile(id);
    const userData = false;
    const formattedData = formatLoginAppUserData(userData); // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

    return {
      data: formattedData,
      authenticated: true,
      message: 'Google Login Successful',
      status: 201,
    };
  }
}
