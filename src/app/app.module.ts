import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from './profile/profile.component';
import {httpInterceptorProviders} from "./helpers/http.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MY_DATE_FORMATS} from "./helpers/my-date-formats";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {BankComponent} from "./bank/bank.component";
import {BankDialogComponent} from "./bank/bank-dialog/bank-dialog.component";
import {Bank} from "./entities/Bank";
import {DocumentType} from "./entities/DocumentType";
import {DocumentTypeDialogComponent} from "./document-type/document-type-dialog/document-type-dialog.component";
import {DocumentTypeComponent} from "./document-type/document-type.component";
import {ClientComponent} from "./client/client.component";
import {ClientDialogComponent} from "./client/client-dialog/client-dialog.component";
import {DocumentComponent} from "./document/document.component";
import {DocumentDialogComponent} from "./document/document-dialog/document-dialog.component";
import {ClientPipePipe} from "./document/pipes/client-pipe.pipe";
import {DocumentTypePipe} from "./document/pipes/document-type-pipe.pipe";
import {CurrencyComponent} from "./currency/currency.component";
import {CurrencyDialogComponent} from "./currency/currency-dialog/currency-dialog.component";
import {AccountComponent} from "./account/account.component";
import {AccountClientPipePipe} from "./account/pipes/client-pipe.pipe";
import {AccountCurrencyPipePipe} from "./account/pipes/currency-pipe.pipe";
import {AccountDialogComponent} from "./account/account-dialog/account-dialog.component";
import {AccountBankPipePipe} from "./account/pipes/bank-pipe.pipe";
import {CardComponent} from "./card/card.component";
import {AccountPipePipe} from "./card/pipes/account-pipe.pipe";
import {CardDialogComponent} from "./card/card-dialog/card-dialog.component";

registerLocaleData(ru);

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'bank', component: BankComponent},
  {path: 'client', component: ClientComponent},
  {path: 'document-type', component: DocumentTypeComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'currency', component: CurrencyComponent},
  {path: 'account', component: AccountComponent},
  {path: 'card', component: CardComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [//классы представлений (view classes), которые принадлежат модулю. Angular имеет три типа классов представлений: компоненты (components), директивы (directives), каналы (pipes)
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BankComponent,
    ClientComponent,
    DocumentTypeComponent,
    CurrencyComponent,
    ProfileComponent,
    BankDialogComponent,
    ClientDialogComponent,
    AccountDialogComponent,
    AccountComponent,
    CardComponent,
    DocumentTypeDialogComponent,
    CardDialogComponent,
    CurrencyDialogComponent,
    DocumentComponent,
    DocumentDialogComponent,
    ClientPipePipe,
    AccountClientPipePipe,
    AccountCurrencyPipePipe,
    AccountBankPipePipe,
    DocumentTypePipe,
    AccountPipePipe
  ],
  imports: [//другие модули, классы которых необходимы для шаблонов компонентов из текущего модуля
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  providers: [httpInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}],//классы, создающие сервисы, используемые модулем
  bootstrap: [AppComponent]//корневой компонент, который вызывается по умолчанию при загрузке приложения
})
export class AppModule {
}
