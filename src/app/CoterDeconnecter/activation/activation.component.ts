import { AuthService } from '../../CoterConnecter/common/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private authService:AuthService) { }

 
  public id : number= 0;
  public idActivation :string = "";
  ngOnInit(): void {
    // CE QU IL NOUS PERMET DE RECUPERER LES DONNEES TRANSMISE DU BACK END VIA L'URL
    this.route.queryParams.subscribe(param =>{
      this.id=param['id']
      this.idActivation=param['idActivation']
    })
  }

  // FONCTION QUI PERMET A L'APPUYE SUR LE BOUTON DE ACTIVER LE COMPTE DE L'UTILISATEUR
  public onSubmit(){
    this.authService.activer(this.id ,this.idActivation)
    .subscribe((param) => {
      console.log(param)
    });
  }
}
