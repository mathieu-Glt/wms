export interface LigneReceptionProps {
  id?: string;
  quantite_prevue: number;
  quantite_recue: number;
  receptionId: string;
  productId: string;
  locationId: string;
}

export class LigneReception {
  readonly id?: string;
  readonly quantite_prevue: number;
  readonly quantite_recue: number;
  readonly receptionId: string;
  readonly productId: string;
  readonly locationId: string;

  private constructor(props: LigneReceptionProps) {
    this.id = props.id;
    this.quantite_prevue = props.quantite_prevue;
    this.quantite_recue = props.quantite_recue;
    this.receptionId = props.receptionId;
    this.productId = props.productId;
    this.locationId = props.locationId;
  }

  static create(props: LigneReceptionProps): LigneReception {
    if (!Number.isInteger(props.quantite_prevue) || props.quantite_prevue < 0) {
      throw new Error("La quantité prévue doit être un entier positif ou nul");
    }
    if (!Number.isInteger(props.quantite_recue) || props.quantite_recue < 0) {
      throw new Error("La quantité reçue doit être un entier positif ou nul");
    }
    if (!props.receptionId) {
      throw new Error("La réception rattachée est requise");
    }
    if (!props.productId) {
      throw new Error("Le produit est requis");
    }
    if (!props.locationId) {
      throw new Error("L'emplacement est requis");
    }

    return new LigneReception(props);
  }
}
