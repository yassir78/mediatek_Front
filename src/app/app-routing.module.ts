import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccueilComponent} from "./components/accueil/accueil.component";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {AdminConnexComponent} from "./components/admin-connex/admin-connex.component";
import {AdminDashComponent} from "./components/admin-dash/admin-dash.component";
import {DashClientComponent} from "./components/dash-client/dash-client.component";
import {DashProduitComponent} from "./components/dash-produit/dash-produit.component";
import {CommandeComponent} from "./components/commande/commande.component";
import {FactureComponent} from "./components/facture/facture.component";
import {StatistiqueComponent} from "./components/statistique/statistique.component";
import {ChiffreAffaireComponent} from "./components/chiffre-affaire/chiffre-affaire.component";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accueil',
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'adminConnex',
    component: AdminConnexComponent
  }, {
    path: 'adminDash',
    component: AdminDashComponent
  },
  {
    path: 'dashClient',
    component: DashClientComponent
  },
  {
    path: 'dashProduit',
    component: DashProduitComponent
  },
  {
    path:'commande',
    component:CommandeComponent
  },
  {
    path:'facture',
    component:FactureComponent
  },
  {
    path:'statistique',
    component:StatistiqueComponent
  },
  {
    path:'chiffre',
    component:ChiffreAffaireComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [AccueilComponent, InscriptionComponent, DashClientComponent]
