import { Entreprise } from './../../models/Entreprise';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/Utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../common/serviceUtilisateur.service';
import { TokenService } from '../common/token.service';
import { ServiceEntreprise } from '../common/ServiceEntreprise';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private tokenService: TokenService, private formB: FormBuilder, private router: Router, private serviceEntreprise: ServiceEntreprise) { }
  public user: Utilisateur;
  public listEntreprise: Entreprise[] = [];
  public form: FormGroup;
  public messageError: string;

  ngOnInit(): void {
    this.user = this.tokenService.getUser().user;
    this.serviceEntreprise.getAll().subscribe((param) => {
      this.listEntreprise = param
    });
    this.initForm();

  }
  public initForm() {
    this.form = this.formB.group({
      nom: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
      adresse: ['', [Validators.required, Validators.minLength(4)]],
      complementAdresse: ['', [Validators.required, Validators.minLength(4)]],
      numeroSiret: ['', [Validators.required, Validators.minLength(10)]],
      numero: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    })
  }
  public reload(time: number) {
    setTimeout(() => window.location.reload(), time);
  }
  public onSubmit() {

    let entreprise: Entreprise = new Entreprise(
      this.form.get('nom').value.toLowerCase(),
      this.form.get('adresse').value.toLowerCase(),
      this.form.get('complementAdresse').value.toLowerCase(),
      this.form.get('email').value.toLowerCase(),
      this.form.get('numero').value.toLowerCase(),
      this.form.get('numeroSiret').value.toLowerCase(),
      this.form.get('description').value.toLowerCase(),
    );
    this.serviceEntreprise.addEntrerprise(entreprise).subscribe((param) => {
      this.messageError = param.message;
      this.reload(2000)
    }, (err) => {
      this.messageError = err.error.message
    })

  }
  public AjoutEntreptrise() {
    this.router.navigate(['entreprise']);
  }
  public supprimerEntreprise(idEntreprise : number){
    this.serviceEntreprise.supprimerEntreprise(idEntreprise).subscribe((param)=>{
      console.log(param)
      this.messageError=param.message;
      this.reload(3500);
    },(err)=>{
      this.messageError=err.message;
      console.log(err)
    });
  }
  
  public gerer(idEntreprise: number) {
    // par defaut, on enlève un potentiel id d'entreprise present
    window.sessionStorage.removeItem("idEntreprise");
    // on enregistre celui qu'on veut conserver
    window.sessionStorage.setItem("idEntreprise", idEntreprise.toString());
    this.reload(0);
    this.router.navigate(['GererEntreprise']);
  }
}
