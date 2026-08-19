export type Role = "ADMIN" | "MANAGER" | "OPERATOR";

export interface UserProps {
  id?: string;
  name: string;
  firstname: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
}

export class User {
  readonly id?: string;
  readonly name: string;
  readonly firstname: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly createdAt?: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.firstname = props.firstname;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.createdAt = props.createdAt;
  }

  static create(props: UserProps): User {
    if (!props.email || !User.isValidEmail(props.email)) {
      throw new Error("Email invalide");
    }
    if (!props.password) {
      throw new Error("Mot de passe requis");
    }
    if (!props.name || !props.firstname) {
      throw new Error("Nom et prénom requis");
    }
    return new User(props);
  }

  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
