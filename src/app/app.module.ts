import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule,routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { AccueilComponent } from './components/accueil/accueil.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminConnexComponent } from './components/admin-connex/admin-connex.component';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { DashClientComponent } from './components/dash-client/dash-client.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from "@angular/material/icon";
import {DecimalPipe} from "@angular/common";
import { DashProduitComponent } from './components/dash-produit/dash-produit.component';
import { CommandeComponent } from './components/commande/commande.component';
import { UpdateProduitComponent } from './dialogs/update-produit/update-produit.component';
import { UpdateClientComponent } from './dialogs/update-client/update-client.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FactureComponent } from './components/facture/facture.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import { StockComponent } from './dialogs/stock/stock.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SaveFactComponent } from './dialogs/save-fact/save-fact.component';
import { TriggerComponent } from './dialogs/trigger/trigger.component';
import { ChiffreAffaireComponent } from './components/chiffre-affaire/chiffre-affaire.component';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    InscriptionComponent,
    ConnexionComponent,
    AdminConnexComponent,
    AdminDashComponent,
    DashClientComponent,
    DashProduitComponent,
    CommandeComponent,
    UpdateProduitComponent,
    UpdateClientComponent,
    FactureComponent,
    StockComponent,
    StatistiqueComponent,
    SpinnerComponent,
    SaveFactComponent,
    TriggerComponent,
    ChiffreAffaireComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        SimplebarAngularModule,
        MatOptionModule,
        MatSelectModule,
        MatExpansionModule,
        MatToolbarModule,
        MatProgressSpinnerModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
