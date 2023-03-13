export interface IShipping {
  cep: string;
  address: string;
  ship: IShip[];
}

export interface IShip {
  date: number;
  type: string;
  price: number;
}
