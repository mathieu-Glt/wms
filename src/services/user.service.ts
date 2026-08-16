import {
  PrismaUserRepository,
  IUserRepository,
} from "../repositories/user.repository";

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository = new PrismaUserRepository(),
  ) {}

  async find() {
    const users = await this.userRepository.find();
    return { users };
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return { user };
  }
}
