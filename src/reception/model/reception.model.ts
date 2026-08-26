export type ReceptionStatus = "BROUILLON" | "VALIDEE" | "ANNULEE";

export interface ReceptionProps {
  id?: string;
  reference: string;
  status: ReceptionStatus;
  date_creation?: Date;
  date_validation?: Date | null;
  supplierId: string;
  userId: string;
}

export class Reception {
  readonly id?: string;
  readonly reference: string;
  readonly status: ReceptionStatus;
  readonly date_creation?: Date;
  readonly date_validation?: Date | null;
  readonly supplierId: string;
  readonly userId: string;

  private constructor(props: ReceptionProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.status = props.status;
    this.date_creation = props.date_creation;
    this.date_validation = props.date_validation;
    this.supplierId = props.supplierId;
    this.userId = props.userId;
  }

  static create(props: ReceptionProps): Reception {
    const reference = props.reference?.trim();

    if (!reference) {
      throw new Error("La référence de la réception est requise");
    }
    if (!props.supplierId) {
      throw new Error("Le fournisseur est requis");
    }
    if (!props.userId) {
      throw new Error("L'utilisateur créateur est requis");
    }

    return new Reception({ ...props, reference });
  }
}
