import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import { IGroupDetail, IGroupDetailList, ITableColumns } from '../customers.model';
import { slideInOutAnimation } from 'src/app/animation';
import { CustomerService } from 'src/app/services/customer.service';
import { EditGroupDetailComponent } from '../edit-group-detail/edit-group-detail.component';

@Component({
  selector: 'group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
    // make fade in animation available to this component
    animations: [slideInOutAnimation],
    // attach the fade in animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class GroupDetailComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<IGroupDetailList>;
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
    const groupId: string = this.route.snapshot.queryParams['id'];
    this.name = this.route.snapshot.queryParams['name'];
    this.description = this.route.snapshot.queryParams['description'];
    this.columnNames = [
      { id: 'vmName', value: 'VM Name' },
      { id: 'status', value: 'Status' },
      { id: 'cludName', value: 'Cloud Name' },
      { id: 'ip', value: 'IP' },
      { id: 'startPos', value: 'Start Pos' },
      { id: 'stopPos', value: 'Stop Pos' },
    ];

    this.displayedColumns = this.columnNames.map(column => column.id);
    this.customersService.getGroupDetail().pipe(take(1)).subscribe((groupDetailList: IGroupDetailList[]) => {
      console.log('detail:123 ', groupDetailList);
      const groupList: IGroupDetailList[] = groupDetailList.filter(detail => detail.id === groupId);
      console.log('groupList: ', groupList);
      this.dataSource = new MatTableDataSource(groupList);
      this.dataSource.sort = this.sort;
    });

  }

  onRowClick(row: IGroupDetailList) {
    // this.router.navigate(["/customers/customer-detail"], { queryParams: { id: row.id } });
  }

  editGroup() {
    this.dialog.open(EditGroupDetailComponent, { height: '75%', width: '500px',
      data: { name: this.name, description: this.description },
      panelClass: ['animate__animated','animate__slideInDown']
    }).afterClosed().pipe(take(1)).subscribe((updatedGroupDetail: IGroupDetail) => {
      if (updatedGroupDetail){
        console.log(`onClose updatedGroupDetail:`, updatedGroupDetail.name);
        this.name = updatedGroupDetail.name;
        this.description = updatedGroupDetail.description;
      }
    });
  }

}
