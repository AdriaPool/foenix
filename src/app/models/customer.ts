export class Customer {
  public id: number;
  public name: string;
  public description: string;
  public color: string;
  public noOfGroups: string;
}

export interface ITableColumns {
  id: string;
  value: string
};

export interface ICustomersList {
  id: string;
  name: string;
  description: string;
  color: string;
  noOfGroups: number;
  logo: string;
}

export interface ICustomerDetail {
  color: string;
  description: string;
  id: string;
  name: string;
  noOfVms: number;
  image: string;
}
