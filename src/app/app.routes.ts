import { MotDePasseOublierComponent } from './CoterDeconnecter/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { NotFoundComponent } from './CoterDeconnecter/not-found/not-found.component';
import { AccueilComponent } from './CoterDeconnecter/accueil/accueil.component';
import { GererEntrepriseComponent } from './CoterConnecter/gerer-entreprise/gerer-entreprise.component';
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
  { path: 'Accueil', component: AccueilComponent },
  { path: '', component: AccueilComponent },
  { path: 'activation', component: ActivationComponent },
  { path: 'mdpOublier', component: MotDePasseOublierComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [GuardUserGuard]},
  { path: 'formFacture', component: FormFactureComponent, canActivate: [GuardUserGuard] },
  { path: 'GererEntreprise', component: GererEntrepriseComponent,  canActivate: [GuardUserGuard] },
  { path: '**', component: NotFoundComponent },
];
