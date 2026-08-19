export interface ProductProps {
  id?: string;
  reference: number;
  name: string;
  describe?: string | null;
  code_barre: string;
  unite: string;
  stock_minimum: number;
  actif: boolean;
}

export class Product {
  readonly id?: string;
  readonly reference: number;
  readonly name: string;
  readonly describe?: string | null;
  readonly code_barre: string;
  readonly unite: string;
  readonly stock_minimum: number;
  readonly actif: boolean;

  private constructor(props: ProductProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.name = props.name;
    this.describe = props.describe;
    this.code_barre = props.code_barre;
    this.unite = props.unite;
    this.stock_minimum = props.stock_minimum;
    this.actif = props.actif;
  }

  static create(props: ProductProps): Product {
    if (!Number.isInteger(props.reference) || props.reference <= 0) {
      throw new Error("La référence doit être un entier positif");
    }
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Le nom du produit est requis");
    }
    if (!props.code_barre || props.code_barre.trim().length === 0) {
      throw new Error("Le code-barre est requis");
    }
    if (!props.unite || props.unite.trim().length === 0) {
      throw new Error("L'unité est requise");
    }
    if (!Number.isInteger(props.stock_minimum) || props.stock_minimum < 0) {
      throw new Error("Le stock minimum doit être un entier positif ou nul");
    }
    if (typeof props.actif !== "boolean") {
      throw new Error("Le champ actif doit être un booléen");
    }

    return new Product(props);
  }
}
