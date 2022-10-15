import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { EditCustomerDetailComponent } from '../edit-customer-detail/edit-customer-detail.component';
import { CustomersService } from '../customers.service';
import { slideInOutAnimation } from 'src/app/animation';
import { ICustomerDetail, ITableColumns } from '../customers.model';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
    // make fade in animation available to this component
    animations: [slideInOutAnimation],
    // attach the fade in animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class CustomerDetailComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<ICustomerDetail>;
  id: string = '';
  name: string = '';
  description: string = '';
  image: string = '';
  displayedColumns: string[] = [];
  columnNames: ITableColumns[] = [];

  constructor(
    private readonly customersService: CustomersService,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.name = this.route.snapshot.queryParams['name'];
    this.description = this.route.snapshot.queryParams['description'];
    this.image = './assets/images/logo1.png';
    this.columnNames = [
      { id: 'name', value: 'Name' },
      { id: 'noOfVms', value: 'No of VMs' },
    ];

    this.displayedColumns = this.columnNames.map(column => column.id);
    this.customersService.getGroups().pipe(take(1)).subscribe((detail: any) => {
      const customerDetail: ICustomerDetail[] = detail;
      this.dataSource = new MatTableDataSource(customerDetail);
      this.dataSource.sort = this.sort;
    });

  }

  editCustomer() {
    this.dialog.open(EditCustomerDetailComponent, { height: '75%', width: '500px',
      data: { name: this.name, description: this.description, image: this.image },
      panelClass: ['animate__animated','animate__slideInDown']
    }).afterClosed().pipe(take(1)).subscribe((updatedCustomerDetail: ICustomerDetail) => {
      if (updatedCustomerDetail){
        console.log(`onClose updatedCustomerDetail:`, updatedCustomerDetail.name);
        this.name = updatedCustomerDetail.name;
        this.description = updatedCustomerDetail.description;
        this.image = updatedCustomerDetail.image;
      }
    });
  }

  onRowClick(row: ICustomerDetail) {
    this.router.navigate(["/customers/group-detail"], { queryParams: { id: this.id, name: row.name, description: row.description } });
  }

}
