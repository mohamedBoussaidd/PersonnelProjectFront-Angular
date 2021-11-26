import { ServiceClient } from './../common/ServiceClient';
import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { Entreprise } from './../../models/Entreprise';
import { Component, OnInit } from '@angular/core';
import { ServiceEntreprise } from '../common/ServiceEntreprise';
import { ProduitEnregistrer } from 'src/app/models/ProduitEnregistrer';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProduit } from '../common/ServiceProduit.service';

@Component({
  selector: 'app-gerer-entreprise',
  templateUrl: './gerer-entreprise.component.html',
  styleUrls: ['./gerer-entreprise.component.css']
})
export class GererEntrepriseComponent implements OnInit {

  constructor(private serviceEntreprise: ServiceEntreprise, private fb: FormBuilder, private serviceProduit: ServiceProduit, private serviceClient: ServiceClient) {
    this.initForm();

  }

  public form: FormGroup;
  public formClient: any;
  public tableauProduits: ProduitEnregistrer[] = []
  public tableauClients: ClientEnregistrer[] = []
  public listProduits: ProduitEnregistrer[] = []
  public listClients: ClientEnregistrer[] = []
  public messageErrorProduit: string;
  public messageErrorClient: string;
  public entreprise: Entreprise;
  public idEntreprise : number;

  ngOnInit(): void {

    console.log(JSON.parse(window.sessionStorage.getItem("idEntreprise")))
    this.idEntreprise = JSON.parse(window.sessionStorage.getItem("idEntreprise"))

    this.serviceEntreprise.getEntreprise(this.idEntreprise).subscribe((param) => {
      console.log(param)
      this.entreprise = param;
    });
    this.serviceProduit.getAllProduit(this.idEntreprise).subscribe((param) => {
      this.listProduits = param;
      console.log(param)
    });
    this.serviceClient.getAllClient(this.idEntreprise).subscribe((param) => {
      this.listClients = param;
      console.log(param)
    });
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

}