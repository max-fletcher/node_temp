import { UserMongoRepository } from '../db/nosql/repository/user.repository';
import { mapToMongoUser } from '../mapper/user.mapper';

export class UserService {
  private userMongoRepo: UserMongoRepository;

  constructor() {
    this.userMongoRepo = new UserMongoRepository();
  }

  async getMongoUser(email: string) {
    return await this.userMongoRepo.getUser(email);
  }

  async createMongoUser(email: string, name: string) {
    const user = mapToMongoUser(email, name);
    await this.userMongoRepo.createUser(user);
  }
}