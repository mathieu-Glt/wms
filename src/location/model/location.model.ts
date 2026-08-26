export interface LocationProps {
  id?: string;
  name: string;
  code: string;
  capacity: number;
  actif: boolean;
  zoneId: string;
}

export class Location {
  readonly id?: string;
  readonly name: string;
  readonly code: string;
  readonly capacity: number;
  readonly actif: boolean;
  readonly zoneId: string;

  private constructor(props: LocationProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code;
    this.capacity = props.capacity;
    this.actif = props.actif;
    this.zoneId = props.zoneId;
  }

  static create(props: LocationProps): Location {
    const name = props.name?.trim();
    const code = props.code?.trim();

    if (!name) {
      throw new Error("Le nom de l'emplacement est requis");
    }
    if (!code) {
      throw new Error("Le code de l'emplacement est requis");
    }
    if (!Number.isInteger(props.capacity) || props.capacity <= 0) {
      throw new Error("La capacité doit être un entier positif");
    }
    if (typeof props.actif !== "boolean") {
      throw new Error("Le champ actif doit être un booléen");
    }
    if (!props.zoneId) {
      throw new Error("L'emplacement doit être rattaché à une zone");
    }

    return new Location({ ...props, name, code });
  }
}
