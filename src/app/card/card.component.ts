import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";;
import {TokenStorageService} from "../services/token-storage.service";;
import {DocumentService} from "../services/document.service";
import {DocumentType} from "../entities/DocumentType";
import {Client} from "../entities/Client";
import {Document} from "../entities/Document";
import {ClientService} from "../services/client.service";
import {DocumentTypeService} from "../services/document-type.service";
import {DocumentTypeDialogComponent} from "../document-type/document-type-dialog/document-type-dialog.component";
import {CardDialogComponent} from "./card-dialog/card-dialog.component";
import {Card} from "../entities/Card";
import {Account} from "../entities/Account";
import {AccountService} from "../services/account.service";
import {CardService} from "../services/card.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'accountId', 'dateStart', 'dateEnd', 'cvc', 'balance', 'status'];
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Card>(false, []);
  accounts!: Account[];

  role: string | undefined;

  constructor(public dialog: MatDialog,
              private cardService: CardService,
              private tokenStorage: TokenStorageService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
    this.getAllAccounts();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (record, filter) => {
      const dataStr = Object.keys(record)
        .reduce((currentTerm: string, key: string) => {
          let element;
          if (key === 'accountId') element = this.getAccountIdById((record as { [key: string]: any })[key]);
          else element = (record as { [key: string]: any })[key];
          return currentTerm + element + '◬';
        }, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    }

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'accountId':
          return this.getAccountIdById(item.accountId);
        default: // @ts-ignore
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Card): string {
    return `${this.selection.isSelected(<Card>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getAccountIdById(id: number) {
    return this.accounts?.find(account => account.id == id)?.id;
  }

  getAllAccounts() {
    this.accountService.getAccounts().subscribe({
      next: data => {
        this.accounts = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllData() {
    this.cardService.getCards().subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  openAddDataDialog() {
    this.dialog.open(CardDialogComponent, {
      data: [
        this.accounts
      ]
    })
      .afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(CardDialogComponent, {
      data: [
        this.accounts,
        this.selection.selected[0]
      ]
    }).afterClosed().subscribe(data => {
      if (data) {
        this.getAllData();
        this.selection.clear();
      }
    });
  }

  openDeleteDataDialog() {
    this.cardService.deleteCard(this.selection.selected[0]?.id).subscribe({
      next: () => {
        alert("Успешное удаление!");
        this.getAllData();
        this.selection.clear();
      },
      error: err => {
        alert("Ошибка удаления: " + err.message);
      }
    });
  }
}
