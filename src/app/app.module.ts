import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip' ;
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormConnexionComponent } from './CoterDeconnecter/form-connexion/form-connexion.component';
import { ProfilComponent } from './CoterConnecter/profil/profil.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { InscriptionComponent } from './CoterDeconnecter/inscription/inscription.component';
import { NouscontacterComponent } from './CoterDeconnecter/nouscontacter/nouscontacter.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInterceptor } from './LogInterceptor';
import { FormFactureComponent } from './CoterConnecter/form-facture/form-facture.component';
import { GererEntrepriseComponent } from './CoterConnecter/gerer-entreprise/gerer-entreprise.component';
import { AccueilComponent } from './CoterDeconnecter/accueil/accueil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './CoterDeconnecter/not-found/not-found.component';
import { MotDePasseOublierComponent } from './CoterDeconnecter/mot-de-passe-oublier/mot-de-passe-oublier.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FormConnexionComponent,
    ProfilComponent,
    InscriptionComponent,
    NouscontacterComponent,
    FormFactureComponent,
    GererEntrepriseComponent,
    AccueilComponent,
    NotFoundComponent,
    MotDePasseOublierComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS ,
     useClass: LogInterceptor, 
     multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

