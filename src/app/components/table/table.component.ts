import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = ['nombre', 'valorHora', 'id'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @Output() editar: EventEmitter<any> = new EventEmitter();
  @Output() eliminar: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();

  @Input() set data(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }
  @Input() set filtro(text: string) {
    this.applyFilter(text);
  }
  @Input() set columns(listColumns: string[]) {
    this.displayedColumns= listColumns
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = event.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
