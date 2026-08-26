export interface MouvementProps {
  id?: string;
  type: string;
  quantite: number;
  motif?: string | null;
  date_creation?: Date;
  productId: string;
  locationSourceId: string;
  locationDestinationId: string;
  userId: string;
}

export class Mouvement {
  readonly id?: string;
  readonly type: string;
  readonly quantite: number;
  readonly motif?: string | null;
  readonly date_creation?: Date;
  readonly productId: string;
  readonly locationSourceId: string;
  readonly locationDestinationId: string;
  readonly userId: string;

  private constructor(props: MouvementProps) {
    this.id = props.id;
    this.type = props.type;
    this.quantite = props.quantite;
    this.motif = props.motif;
    this.date_creation = props.date_creation;
    this.productId = props.productId;
    this.locationSourceId = props.locationSourceId;
    this.locationDestinationId = props.locationDestinationId;
    this.userId = props.userId;
  }

  static create(props: MouvementProps): Mouvement {
    const type = props.type?.trim();

    if (!type) {
      throw new Error("Le type de mouvement est requis");
    }
    if (!Number.isInteger(props.quantite) || props.quantite <= 0) {
      throw new Error("La quantité doit être un entier strictement positif");
    }
    if (!props.productId) {
      throw new Error("Le produit est requis");
    }
    if (!props.locationSourceId) {
      throw new Error("L'emplacement source est requis");
    }
    if (!props.locationDestinationId) {
      throw new Error("L'emplacement destination est requis");
    }
    if (props.locationSourceId === props.locationDestinationId) {
      throw new Error(
        "L'emplacement source et destination doivent être différents",
      );
    }
    if (!props.userId) {
      throw new Error("L'utilisateur est requis");
    }

    return new Mouvement({ ...props, type });
  }
}
