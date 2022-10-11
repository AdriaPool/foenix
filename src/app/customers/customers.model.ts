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
