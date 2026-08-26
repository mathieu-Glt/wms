export interface LigneInventaireProps {
  id?: string;
  quantite_theorique: number;
  quantite_reelle: number;
  inventaireId: string;
  productId: string;
}

export class LigneInventaire {
  readonly id?: string;
  readonly quantite_theorique: number;
  readonly quantite_reelle: number;
  readonly inventaireId: string;
  readonly productId: string;

  private constructor(props: LigneInventaireProps) {
    this.id = props.id;
    this.quantite_theorique = props.quantite_theorique;
    this.quantite_reelle = props.quantite_reelle;
    this.inventaireId = props.inventaireId;
    this.productId = props.productId;
  }

  static create(props: LigneInventaireProps): LigneInventaire {
    if (
      !Number.isInteger(props.quantite_theorique) ||
      props.quantite_theorique < 0
    ) {
      throw new Error(
        "The theoretical quantity must be a positive integer or zero",
      );
    }
    if (!Number.isInteger(props.quantite_reelle) || props.quantite_reelle < 0) {
      throw new Error("The real quantity must be a positive integer  or zero");
    }
    if (!props.inventaireId) {
      throw new Error("The attached inventory is required");
    }
    if (!props.productId) {
      throw new Error("The product is required");
    }

    return new LigneInventaire(props);
  }

  get ecart(): number {
    return this.quantite_reelle - this.quantite_theorique;
  }
}
