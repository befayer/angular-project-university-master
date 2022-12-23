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
import {DocumentDialogComponent} from "./document-dialog/document-dialog.component";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'dateStart', 'issueOrganization', 'isActive', 'documentTypeId', 'clientId'];
  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Document>(false, []);
  clients!: Client[];
  documentTypes!: DocumentType[];

  role: string | undefined;

  constructor(public dialog: MatDialog,
              private documentService: DocumentService,
              private tokenStorage: TokenStorageService,
              private clientService: ClientService,
              private documentTypeService: DocumentTypeService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
    this.getAllClients();
    this.getAllDocumentTypes();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (record, filter) => {
      const dataStr = Object.keys(record)
        .reduce((currentTerm: string, key: string) => {
          let element;
          if (key === 'documentTypeId') element = this.getDocumentTypeNameById((record as { [key: string]: any })[key]);
          else if (key === 'clientId') element = this.getClientNameById((record as { [key: string]: any })[key]);
          else element = (record as { [key: string]: any })[key];
          return currentTerm + element + '◬';
        }, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    }

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'documentTypeId':
          return this.getDocumentTypeNameById(item.documentTypeId);
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
  checkboxLabel(row?: Document): string {
    return `${this.selection.isSelected(<Document>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getClientNameById(id: number) {
    return this.clients?.find(client => client.id == id)?.firstName;
  }

  getDocumentTypeNameById(id: number) {
    return this.documentTypes?.find(documentType => documentType.id == id)?.documentTypeName;
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

  getAllDocumentTypes() {
    this.documentTypeService.getDocumentTypes().subscribe({
      next: data => {
        this.documentTypes = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllData() {
    this.documentService.getDocuments().subscribe({
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
    this.dialog.open(DocumentDialogComponent, {
      data: [
        this.clients,
        this.documentTypes
      ]
    })
      .afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(DocumentTypeDialogComponent, {
      data: [
        this.clients,
        this.documentTypes,
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
    this.documentService.deleteDocument(this.selection.selected[0]?.id).subscribe({
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
