export interface WarehouseProps {
  id?: string;
  name: string;
  address: string;
}

export class Warehouse {
  readonly id?: string;
  readonly name: string;
  readonly address: string;

  private constructor(props: WarehouseProps) {
    this.id = props.id;
    this.name = props.name;
    this.address = props.address;
  }

  static create(props: WarehouseProps): Warehouse {
    const name = props.name?.trim();
    const address = props.address?.trim();

    if (!name) {
      throw new Error("Le nom de l'entrepôt est requis");
    }
    if (!address) {
      throw new Error("L'adresse de l'entrepôt est requise");
    }

    return new Warehouse({ ...props, name, address });
  }
}
