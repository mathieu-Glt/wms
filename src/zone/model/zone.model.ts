export interface ZoneProps {
  id?: string;
  name: string;
  code: string;
  warehouse_id: string;
}

export class Zone {
  readonly id?: string;
  readonly name: string;
  readonly code: string;
  readonly warehouse_id: string;

  private constructor(props: ZoneProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code;
    this.warehouse_id = props.warehouse_id;
  }

  static create(props: ZoneProps): Zone {
    const name = props.name?.trim();
    const code = props.code?.trim();

    if (!name) {
      throw new Error("Le nom de la zone est requis");
    }
    if (!code) {
      throw new Error("Le code de la zone est requis");
    }
    if (!props.warehouse_id) {
      throw new Error("La zone doit être rattachée à un entrepôt");
    }

    return new Zone({ ...props, name, code });
  }
}
