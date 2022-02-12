import { Router } from '@angular/router';
import { UtilisateurInscription } from '../../models/UtilisateurInscription';
import { AuthService } from '../../CoterConnecter/common/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../../CoterConnecter/common/serviceUtilisateur.service';
import { ServiceUtils } from '../../CoterConnecter/common/serviceUtils.service';
import { Utilisateur } from '../../models/Utilisateur.model';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  constructor(private fb: FormBuilder, private serviceUtils: ServiceUtils, private serviceUser: AuthService, private route: Router) { }

  public monFormulaire: FormGroup;
  ngOnInit(): void {
    this.monFormulaire = this.fb.group(
      {
        nomInscription: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        prenomInscription: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        emailInscription: ['', [Validators.required, Validators.email]],
        mdpInscription: ['', [Validators.required, Validators.minLength(4)]],
        confirmMdp: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        validator: this.serviceUtils.verificationMatch(
          'mdpInscription',
          'confirmMdp'
        ),
      }
    );
  }
  public utilisateur: UtilisateurInscription = new UtilisateurInscription("", "", "", "");

  public confirmMdp: string;
  public messageErrorOuReussi: string;


  /* A LA SOUMISSION DU FORMULAIRE D'INSCRIPTION */
  public aLaSoumission() {
    if (
      this.monFormulaire.get('mdpInscription').value === this.monFormulaire.get('confirmMdp').value
    ) {
      this.utilisateur.nom = this.monFormulaire.get('nomInscription').value;
      this.utilisateur.prenom = this.monFormulaire.get('prenomInscription').value;
      this.utilisateur.mail = this.monFormulaire.get('emailInscription').value;
      this.utilisateur.pass = this.monFormulaire.get('mdpInscription').value;
      this.confirmMdp = this.monFormulaire.get('confirmMdp').value;

      /* APPEL A LA FONCTION DU SERVICE QUI AJOUTE UN UTILISATEUR */

      this.serviceUser.inserUser(this.utilisateur)
        .subscribe((param: any) => {
          this.messageErrorOuReussi = param.message;
          console.log(param);
          this.route.navigate(['/connexion'])
        },
          (error) => this.messageErrorOuReussi = error.error.message)
          console.log(this.messageErrorOuReussi)
          // window.location.reload()
    }
  }
}
