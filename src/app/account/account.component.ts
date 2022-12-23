import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";;
import {TokenStorageService} from "../services/token-storage.service";;
import {Client} from "../entities/Client";
import {ClientService} from "../services/client.service";
import {DocumentTypeDialogComponent} from "../document-type/document-type-dialog/document-type-dialog.component";
import {Account} from "../entities/Account";
import {Bank} from "../entities/Bank";
import {Currency} from "../entities/Currency";
import {BankService} from "../services/bank.service";
import {CurrencyService} from "../services/currency.service";
import {AccountService} from "../services/account.service";
import {AccountDialogComponent} from "./account-dialog/account-dialog.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'accountStatus', 'balance', 'bankId', 'currencyId', 'clientId'];
  dataSource: MatTableDataSource<Account> = new MatTableDataSource<Account>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Account>(false, []);
  banks!: Bank[];
  currencies!: Currency[];
  clients!: Client[];

  role: string | undefined;

  constructor(public dialog: MatDialog,
              private accountService: AccountService,
              private tokenStorage: TokenStorageService,
              private bankService: BankService,
              private currencyService: CurrencyService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
    this.getAllBanks();
    this.getAllCurrencies();
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (record, filter) => {
      const dataStr = Object.keys(record)
        .reduce((currentTerm: string, key: string) => {
          let element;
          if (key === 'bankId') element = this.getBankNameById((record as { [key: string]: any })[key]);
          else if (key === 'currencyId') element = this.getCurrencyNameById((record as { [key: string]: any })[key]);
          else if (key === 'clientId') element = this.getClientNameById((record as { [key: string]: any })[key]);
          else element = (record as { [key: string]: any })[key];
          return currentTerm + element + '◬';
        }, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    }

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'bankId':
          return this.getBankNameById(item.bankId);
        case 'currencyId':
          return this.getCurrencyNameById(item.currencyId);
        case 'clientId':
          return this.getClientNameById(item.clientId);
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
  checkboxLabel(row?: Account): string {
    return `${this.selection.isSelected(<Account>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getBankNameById(id: number) {
    return this.banks?.find(bank => bank.id == id)?.terbankName;
  }

  getCurrencyNameById(id: number) {
    return this.currencies?.find(currency => currency.id == id)?.currencyName;
  }

  getClientNameById(id: number) {
    return this.clients?.find(client => client.id == id)?.firstName;
  }

  getAllBanks() {
    this.bankService.getBanks().subscribe({
      next: data => {
        this.banks = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllCurrencies() {
    this.currencyService.getCurrencies().subscribe({
      next: data => {
        this.currencies = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllClients() {
    this.clientService.getClients().subscribe({
      next: data => {
        this.clients = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllData() {
    this.accountService.getAccounts().subscribe({
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
    this.dialog.open(AccountDialogComponent, {
      data: [
        this.banks,
        this.currencies,
        this.clients
      ]
    })
      .afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(AccountDialogComponent, {
      data: [
        this.banks,
        this.currencies,
        this.clients,
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
    this.accountService.deleteAccount(this.selection.selected[0]?.id).subscribe({
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
