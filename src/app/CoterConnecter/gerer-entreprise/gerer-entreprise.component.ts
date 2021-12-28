import { ServiceFacture } from './../common/ServiceFacture.service';
import { ServicePdf } from './../common/ServicePdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceClient } from './../common/ServiceClient';
import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { Entreprise } from './../../models/Entreprise';
import { Component, OnInit } from '@angular/core';
import { ServiceEntreprise } from '../common/ServiceEntreprise';
import { ProduitEnregistrer } from 'src/app/models/ProduitEnregistrer';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProduit } from '../common/ServiceProduit.service';
import { Facture } from 'src/app/models/Facture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerer-entreprise',
  templateUrl: './gerer-entreprise.component.html',
  styleUrls: ['./gerer-entreprise.component.css']
})
export class GererEntrepriseComponent implements OnInit {

  constructor(private serviceEntreprise: ServiceEntreprise, private fb: FormBuilder, private serviceProduit: ServiceProduit, private serviceClient: ServiceClient, private http:HttpClient,
    private servicePdf : ServicePdf,private router :Router, private serviceFacture :ServiceFacture) {
    this.initForm();

  }

  public form: FormGroup;
  public formClient: any;
  public tableauProduits: ProduitEnregistrer[] = []
  public tableauClients: ClientEnregistrer[] = []
  public listProduits: ProduitEnregistrer[] = []
  public listClients: ClientEnregistrer[] = []
  public listFactures: Facture[] = []
  public messageErrorProduit: string;
  public messageErrorClient: string;
  public entreprise: any;
  public idEntreprise : number;
  public displayDetails :boolean = false ;
  public displayMenu :boolean = false ;
  public formFacture :boolean = false;


  ngOnInit(): void {
   
    // ON RECUPERE L 'ID DE L'ENTREPRISE EN CHOISI
    this.idEntreprise = JSON.parse(window.sessionStorage.getItem("idEntreprise"))
    console.log(this.idEntreprise)


    //RECUPERATION ET ENREGISTREMENT DE L'ENTREPRISE 
    this.serviceEntreprise.getEntreprise(this.idEntreprise).subscribe((param) => {
      this.entreprise = param;
      console.log(this.entreprise)
      // par defaut, on enlève une potentiel entreprise presente
     window.sessionStorage.removeItem("entreprise");
     // on enregistre celui qu'on veut conserver
     window.sessionStorage.setItem("entreprise", JSON.stringify(this.entreprise));
     console.log(window.sessionStorage.getItem("entreprise"))
    });

    //RECUPERATION ET ENREGISTREMENT DES PRODUITS
    this.serviceProduit.getAllProduit(this.idEntreprise).subscribe((param) => {
      this.listProduits = param;
      console.log(param)
       // par defaut, on enlève un potentiel produit present
     window.sessionStorage.removeItem("produitEntreprise");
     // on enregistre celui qu'on veut conserver
     window.sessionStorage.setItem("produitEntreprise", JSON.stringify(this.listProduits));
    });

    //RECUPERATION ET ENREGISTREMENT DES CLIENTS 
    this.serviceClient.getAllClient(this.idEntreprise).subscribe((param) => {
      this.listClients = param;
      console.log(this.listClients)
       // par defaut, on enlève un potentiel client present
     window.sessionStorage.removeItem("clientEntreprise");
     // on enregistre celui qu'on veut conserver
     window.sessionStorage.setItem("clientEntreprise", JSON.stringify(this.listClients));
      console.log(param)
    });

     //RECUPERATION ET ENREGISTREMENT DES FACTURES 
     this.serviceFacture.getAllFacture(this.idEntreprise).subscribe((param)=>{
      console.log(param);
      this.listFactures = param;
    })
  }
  public initForm() {
    this.form = this.fb.group({
      champ: this.fb.array([

      ]),
      champClient: this.fb.array([

      ])
    })
  }

  // GENERATION ET SUPPRESSION DE CHAMP POUR LES PRODUITS
  get champ(): FormArray {
    return this.form.get("champ") as FormArray
  }
  nouveauChamp(): FormGroup {
    return this.fb.group({
      stock: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    })
  }

  ajoutChampProduit() {
    this.champ.push(this.nouveauChamp());
  }

  //SUPPRIMER UN CHAMP 
  suppChamp(i: number) {
    this.champ.removeAt(i);
    this.tableauProduits.splice(i, i);
  }


  // GENERATION ET SUPPRESSION DE CHAMP POUR LES CLIENTS
  get champClient(): FormArray {
    return this.form.get("champClient") as FormArray
  }
  nouveauChampClient(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
    })
  }

  ajoutChampClient() {
    this.champClient.push(this.nouveauChampClient());
  }


  //SUPPRIMER UN CHAMP 
  suppChampClient(i: number) {
    this.champClient.removeAt(i);
    this.tableauProduits.splice(i, i);
  }
  //VALIDER UN PRODUIT ET S'ASSURER QE L'UTILISATEUR EN PUISSE PAS EN RAJOUTER 2 FOIS LE MEME 
  public onSubmit() {
    this.tableauProduits = []
    let valeursChamp = this.form.value.champ
    
    
    //BOUCLE POUR GERER LES PRODUITS
    for (let i = 0; i < valeursChamp.length; i++) {
      let produit1: ProduitEnregistrer;
      const element = valeursChamp[i];
      if (this.tableauProduits.length == 0) {
        this.tableauProduits.push(new ProduitEnregistrer(element.designation, element.prix, element.stock));
      } else {
        for (let j = 0; j < this.tableauProduits.length; j++) {
          const jelement = this.tableauProduits[j];
          if (jelement.designation == element.designation) {
            return this.messageErrorProduit = "Vous esseyez d'ajouter deux fois le même produit"
          } else {
            produit1 = new ProduitEnregistrer(element.designation, element.prix, element.stock)
          }
        }
        this.tableauProduits.push(produit1)
      }
    }
      // ON ENREGISTRE LES PRODUITS VIA LE SERVICE
      this.serviceProduit.enregistrerProduits(this.tableauProduits,this.idEntreprise).subscribe((param: any) => {
        this.messageErrorProduit = param.message;
      }, (err) => {
        this.messageErrorProduit = err.error.message;
      });

    // BOUCLE POUR GERE LES CLIENTS
    this.tableauClients = []
    let valeurchampClient = this.form.value.champClient
    for (let i = 0; i < valeurchampClient.length; i++) {
      let client1: ClientEnregistrer;
      const element = valeurchampClient[i];
      if (this.tableauClients.length == 0) {
        this.tableauClients.push(new ClientEnregistrer(element.nom, element.email, element.numero, element.adresse));
      } else {
        for (let j = 0; j < this.tableauClients.length; j++) {
          const jelement = this.tableauClients[j];
          if (jelement.nom == element.nom) {
            return this.messageErrorClient = "Vous esseyez d'ajouter deux fois le même client"
          } else {
            client1 = new ClientEnregistrer(element.nom, element.email, element.numero, element.adresse)
          }
        }
        this.tableauClients.push(client1)
        
      }
      console.log(client1)
        console.log(this.tableauClients)
    }
  
    this.serviceClient.enregistrerClients(this.tableauClients,this.idEntreprise).subscribe((param: any) => {
      this.messageErrorClient = param.message;
    }, (err) => {
      this.messageErrorClient = err.error.message;
    });

    setTimeout(()=>this.reload(), 1500);
    
  }
  public reload(){
    window.location.reload()
  }

  public display(client : ClientEnregistrer ){
    console.log(client)
     // par defaut, on enlève un potentiel client present
     window.sessionStorage.removeItem("client");
     // on enregistre celui qu'on veut conserver
     window.sessionStorage.setItem("client", JSON.stringify(client));
    this.displayMenu =! this.displayMenu;
  }
  public clientDetail: ClientEnregistrer;

  //FONCTION POUR VOIR LE DETAIL DU CLIENT
  public displayDetail(client:ClientEnregistrer){
    this.clientDetail = client
    this.displayDetails =! this.displayDetails;
  }
// FONCTION POUR FAIRE TELECHARGER LE PDF
  public telecharger(idFacture:number ){
    window.open("http://localhost:8080/pdf/getPdf/"+idFacture, "_blank");

    // this.servicePdf.getPdf(idFacture).subscribe((param)=>{
      
    //   console.log(param);
    // });
  }
}
