// COMMENTED TO MITIGATE TYPESCRIPT ERRORS

// import { createUserId } from '../utils/id.utils';
import { Request } from 'express';
// import { mapToUserModel } from '../mapper/user.mapper';
// import { hashPassword } from '../utils/password.utils';
// import { AuthProviders } from '../constants/enums';
import { deleteMultipleFileLocal } from '../middleware/fileUploadLocal.middleware';

export class TestService {

  constructor() {
    
  }

  async createUserWithImages(
    username: string,
    email: string,
    password: string,
    phone: string,
    images: string[] | null,
  ) {

    console.log(username, email, password, phone, images);

    // const rdsUser = await this.userRepo.createUser(newUser);
    // const rdsUser = await this.userRepo.findUserByEmail(email);
    return {
      user: true,
    };
  }

  async deleteUserWithImages(req: Request, id: string) {
    // const rdsUser = await this.userRepo.findUserById(id);
    // if (!rdsUser) throw new NotFoundException('User with given ID not found !');

    const imagesArray: string[]|null = []
    deleteMultipleFileLocal(req, imagesArray);

    // deleteMultipleFileLocal(req, rdsUser.images!);
    // const result = await this.userRepo.deleteById(id);

    // if (!result)
    //   throw new CustomException('Failed to delete! Please try again.', 500);

    return {
      message: 'User deleted successfully!',
      statusCode: 200,
      data: true,
    };
  }
}
