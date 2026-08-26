export interface StockProps {
  id?: string;
  productId: string;
  locationId: string;
  quantite: number;
}

export class Stock {
  readonly id?: string;
  readonly productId: string;
  readonly locationId: string;
  readonly quantite: number;

  private constructor(props: StockProps) {
    this.id = props.id;
    this.productId = props.productId;
    this.locationId = props.locationId;
    this.quantite = props.quantite;
  }

  static create(props: StockProps): Stock {
    if (!props.productId) {
      throw new Error("Le produit est requis");
    }
    if (!props.locationId) {
      throw new Error("L'emplacement est requis");
    }
    if (!Number.isInteger(props.quantite) || props.quantite < 0) {
      throw new Error("La quantité doit être un entier positif ou nul");
    }

    return new Stock(props);
  }
}
