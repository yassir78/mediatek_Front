import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from "./components/accueil/accueil.component";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accueil',
  },
  {
    path:'accueil',
    component:AccueilComponent
  },
  {
    path:'connexion',
    component:ConnexionComponent
  },
  {
    path:'inscription',
    component:InscriptionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AccueilComponent,InscriptionComponent]
