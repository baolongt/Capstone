export type UpdatePayload = Pick<
  Contact,
  'id' | 'name' | 'organCode' | 'email' | 'phone'
>;

export type CreatePayload = Pick<
  Contact,
  'name' | 'organCode' | 'email' | 'phone'
>;

export class Contact {
  id: number;
  name: string;
  organCode: string;
  email: string;
  phone: string;

  constructor({
    id,
    name,
    organCode,
    email,
    phone
  }: {
    id: number;
    name: string;
    organCode: string;
    email: string;
    phone: string;
  }) {
    this.id = id;
    this.name = name;
    this.organCode = organCode;
    this.email = email;
    this.phone = phone;
  }

  getprop(propName: keyof Contact): string | null {
    return this[propName] ? String(this[propName]) : null;
  }
  toUpdatePayload(): UpdatePayload {
    return {
      id: this.id,
      name: this.name,
      organCode: this.organCode,
      email: this.email,
      phone: this.phone
    };
  }

  toCreatePayload(): CreatePayload {
    return {
      name: this.name,
      organCode: this.organCode,
      email: this.email,
      phone: this.phone
    };
  }
}
