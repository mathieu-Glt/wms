import {
  PrismaUserRepository,
  IUserRepository,
} from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { Role } from "../models/user.model";

interface RegisterInput {
  name: string;
  firstname: string;
  email: string;
  password: string;
  role?: Role;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository = new PrismaUserRepository(),
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("Un compte existe déjà avec cet email");
    }

    const hashed = await hashPassword(input.password);

    const user = await this.userRepository.create({
      name: input.name,
      firstname: input.firstname,
      email: input.email,
      password: hashed,
      role: input.role ?? "OPERATOR",
    });

    const token = signToken({ userId: user.id!, role: user.role });

    return { user: this.toPublicUser(user), token };
  }

  async login(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const isValid = await comparePassword(input.password, user.password);
    if (!isValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const token = signToken({ userId: user.id!, role: user.role });

    return { user: this.toPublicUser(user), token };
  }

  private toPublicUser(user: {
    id?: string;
    name: string;
    firstname: string;
    email: string;
    role: string;
  }) {
    return {
      id: user.id,
      name: user.name,
      firstname: user.firstname,
      email: user.email,
      role: user.role,
    };
  }
}
