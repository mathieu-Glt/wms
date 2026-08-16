import { prisma } from "../lib/prisma";
import { User, Role } from "../models/user.model";

export interface CreateUserData {
  name: string;
  firstname: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  find(): Promise<User[]>;
  //   update(data: CreateUserData): Promise<User>;
}

export class PrismaUserRepository implements IUserRepository {
  async find(): Promise<User[]> {
    const records = await prisma.user.findMany();
    return records.map((record) =>
      User.create({ ...record, role: record.role as Role }),
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return User.create({ ...record, role: record.role as Role });
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return User.create({ ...record, role: record.role as Role });
  }

  async create(data: CreateUserData): Promise<User> {
    const record = await prisma.user.create({ data });
    return User.create({ ...record, role: record.role as Role });
  }
}
