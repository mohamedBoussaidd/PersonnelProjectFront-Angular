import { Utilisateur } from '../../models/Utilisateur.model';
import { UtilisateurService } from '../../CoterConnecter/common/serviceUtilisateur.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../CoterConnecter/common/auth.service';
import { TokenService } from '../../CoterConnecter/common/token.service';

@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrls: ['./form-connexion.component.css'],
})
export class FormConnexionComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private serviceUtilisateur: UtilisateurService,
    private redirect: Router,
    private serviceUser: AuthService,
    private tokenService: TokenService,
  ) { }
  /* DÉCLARATION DES DIFFERENTE VARIABLE ET TABLEAU D'OBJET */
  public form: FormGroup;
  public emailClient: string;
  public mdpClient: string;
  public messageError: string;
  public roles: string[] = [];
  //OBJECT CREE POUR RECEVOIR L'UTILISATEUR LES DONNER DU BACK
  public objetConnexion = {
    user: {},
    accessToken: "",
    roles: [],
    isConnected: false
  }
  ngOnInit(): void {
    /* INITIALISATION DU FORMULAIRE DE CONNEXION */
    this.initForm();
    if (this.tokenService.getUser().isConnected === true) {
      this.redirect.navigate(['/profil'])
    }
  }

  public initForm() {
    this.form = this.formB.group({
      email: ['', [Validators.email]],
      motdepasse: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  /* FONCTION QUI SE DECLANCHE A LA SOUMISSION DU FORMULAIRE */
  public onSubmit() {
    /* ASSIGNE LA VALEUR DU FORMULAIRE ENTRER PAR L'UTILISATEUR  AU VARIABLE */
    this.emailClient = this.form.get('email').value;
    this.mdpClient = this.form.get('motdepasse').value;

    this.serviceUser.authUser(this.emailClient, this.mdpClient)
      .subscribe((param: any) => {
        this.objetConnexion = {
          user: param.user,
          accessToken: param.accessToken,
          roles: param.roles,
          isConnected: true,
        }
        console.log(this.objetConnexion)
        //ENREGISTREMENT DE L'UTILISATEUR DANS LE STORAGE
        this.tokenService.saveUser(this.objetConnexion)

        //ENREGISTREMENT DU TOKEN DANS LE STORAGE
        this.tokenService.saveToken(this.objetConnexion.accessToken);

        //ENREGISTREMENT DU ROLE DE L'UTILISATEUR 
        window.location.reload();
      }, (err) => {
        console.log(err)
        this.messageError = err.error.message;
      })
  }

}
