import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';
import { ICustomersList, ITableColumns } from '../customers.model';
import { fadeInAnimation } from 'src/app/animation';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})

export class CustomersComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<ICustomersList>;
  dataSourceTwo!: MatTableDataSource<Customer>;
  title = 'Shapespark';
  displayedColumns: string[] = [];
  columnNames: ITableColumns[] = [];

  constructor(private readonly customersService: CustomersService, private readonly router: Router) { }

  ngOnInit() {
    this.columnNames = [
      { id: 'name', value: 'Name' },
      { id: 'color', value: 'Color' },
      { id: 'noOfGroups', value: 'No of Groups' },
      { id: 'logo', value: 'Logo' },
    ];

    this.displayedColumns = this.columnNames.map(column => column.id);
    this.customersService.getCustomers().pipe(take(1)).subscribe((customersData: any) => {
      console.log('customersData:123 ', customersData);
      const customersList: ICustomersList[] = customersData;
      const customersListTwo: Customer[] = customersData;
      this.dataSource = new MatTableDataSource(customersList);
      this.dataSource.sort = this.sort;
    });
  }

  onRowClick(row: ICustomersList) {
    this.router.navigate(["/customers/customer-detail"], { queryParams: { id: row.id, name: row.name, description: row.description } });
  }

}



