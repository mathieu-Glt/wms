export interface SupplierProps {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
}

export class Supplier {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly zip_code: string;
  readonly country: string;

  private constructor(props: SupplierProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.address = props.address;
    this.city = props.city;
    this.zip_code = props.zip_code;
    this.country = props.country;
  }

  static create(props: SupplierProps): Supplier {
    const name = props.name?.trim();
    const email = props.email?.trim();
    const phone = props.phone?.trim();
    const address = props.address?.trim();
    const city = props.city?.trim();
    const zip_code = props.zip_code?.trim();
    const country = props.country?.trim();

    if (!name) {
      throw new Error("Le nom du fournisseur est requis");
    }
    if (!email || !Supplier.isValidEmail(email)) {
      throw new Error("Email invalide");
    }
    if (!phone) {
      throw new Error("Le téléphone est requis");
    }
    if (!address) {
      throw new Error("L'adresse est requise");
    }
    if (!city) {
      throw new Error("La ville est requise");
    }
    if (!zip_code) {
      throw new Error("Le code postal est requis");
    }
    if (!country) {
      throw new Error("Le pays est requis");
    }

    return new Supplier({
      ...props,
      name,
      email,
      phone,
      address,
      city,
      zip_code,
      country,
    });
  }

  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
