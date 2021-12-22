import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormConnexionComponent } from './CoterDeconnecter/form-connexion/form-connexion.component';
import { ProfilComponent } from './CoterConnecter/profil/profil.component';
import { RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';
import { InscriptionComponent } from './CoterDeconnecter/inscription/inscription.component';
import { NouscontacterComponent } from './CoterDeconnecter/nouscontacter/nouscontacter.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInterceptor } from './LogInterceptor';
import { FormFactureComponent } from './CoterConnecter/form-facture/form-facture.component';
import { FactureViewComponent } from './CoterConnecter/facture-view/facture-view.component';
import { FormEntrepriseComponent } from './CoterConnecter/form-entreprise/form-entreprise.component';
import { GererEntrepriseComponent } from './CoterConnecter/gerer-entreprise/gerer-entreprise.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FormConnexionComponent,
    ProfilComponent,
    InscriptionComponent,
    NouscontacterComponent,
    FormFactureComponent,
    FactureViewComponent,
    FormEntrepriseComponent,
    GererEntrepriseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( ROUTES ),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
