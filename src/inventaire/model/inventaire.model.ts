export type InventaireStatut = "EN_COURS" | "VALIDE" | "ANNULE";

export interface InventaireProps {
  id?: string;
  statut: InventaireStatut;
  date_creation?: Date;
  date_validation?: Date | null;
  locationId: string;
  userCreationId: string;
  userValidationId?: string | null;
}

export class Inventaire {
  readonly id?: string;
  readonly statut: InventaireStatut;
  readonly date_creation?: Date;
  readonly date_validation?: Date | null;
  readonly locationId: string;
  readonly userCreationId: string;
  readonly userValidationId?: string | null;

  private constructor(props: InventaireProps) {
    this.id = props.id;
    this.statut = props.statut;
    this.date_creation = props.date_creation;
    this.date_validation = props.date_validation;
    this.locationId = props.locationId;
    this.userCreationId = props.userCreationId;
    this.userValidationId = props.userValidationId;
  }

  static create(props: InventaireProps): Inventaire {
    if (!props.locationId) {
      throw new Error("Location is required");
    }
    if (!props.userCreationId) {
      throw new Error("The creator account is required");
    }

    return new Inventaire(props);
  }
}
