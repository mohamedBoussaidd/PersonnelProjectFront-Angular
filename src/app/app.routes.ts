import { MesProduitsComponent } from './CoterConnecter/mes-produits/mes-produits.component';
import { GuardUserGuard } from './Guard/guard-user.guard';
import { NouscontacterComponent } from './CoterDeconnecter/nouscontacter/nouscontacter.component';
import { InscriptionComponent } from './CoterDeconnecter/inscription/inscription.component';
import { FormConnexionComponent } from './CoterDeconnecter/form-connexion/form-connexion.component';
import { Routes, ActivatedRoute } from '@angular/router';
import { ProfilComponent } from './CoterConnecter/profil/profil.component';
import { ActivationComponent } from './CoterDeconnecter/activation/activation.component';
import { FormFactureComponent } from './CoterConnecter/form-facture/form-facture.component';
export const ROUTES: Routes = [
  { path: 'connexion', component: FormConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'nouscontacter', component: NouscontacterComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [GuardUserGuard] },
  { path: 'activation', component: ActivationComponent },
  { path: 'formFacture', component: FormFactureComponent, canActivate: [GuardUserGuard] },
  { path: 'mesProduits', component: MesProduitsComponent,  canActivate: [GuardUserGuard] },
  { path: '', component: FormConnexionComponent },
];
