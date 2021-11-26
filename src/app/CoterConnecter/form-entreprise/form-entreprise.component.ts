import { Router } from '@angular/router';
import { ServiceEntreprise } from './../common/ServiceEntreprise';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Entreprise } from 'src/app/models/Entreprise';

@Component({
  selector: 'app-form-entreprise',
  templateUrl: './form-entreprise.component.html',
  styleUrls: ['./form-entreprise.component.css']
})
export class FormEntrepriseComponent implements OnInit {

  constructor(private formB:FormBuilder,private serviceEntreprise :ServiceEntreprise,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  public form:FormGroup;
  public messageError :string;

  public initForm() {
    this.form = this.formB.group({
      nom: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
      adresse: ['', [Validators.required, Validators.minLength(4)]],
      numero: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    })
  }
  public onSubmit(){
    let entreprise : Entreprise = new Entreprise(
      this.form.get('nom').value,
      this.form.get('adresse').value,
      this.form.get('email').value,
      this.form.get('numero').value,
      this.form.get('description').value,
    );
    this.serviceEntreprise.addEntrerprise(entreprise).subscribe((param)=>{
      this.messageError = param.message;
      this.router.navigate(['profil'])
     
    },(err)=>{
      this.messageError = err.error.message
    })

  }
}
