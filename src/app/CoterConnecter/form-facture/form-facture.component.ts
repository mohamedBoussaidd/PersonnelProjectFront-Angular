import { ProduitEnregistrer } from 'src/app/models/ProduitEnregistrer';
import { Produit } from './../../models/Produit';
import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { ServiceFacture } from './../common/ServiceFacture.service';
import { Facture } from './../../models/Facture';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entreprise } from 'src/app/models/Entreprise';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-form-facture',
  templateUrl: './form-facture.component.html',
  styleUrls: ['./form-facture.component.css']
})
export class FormFactureComponent {

  public formChoixClient: FormGroup;
  public form: FormGroup;
  public formClient: any;
  public montantHT: number;
  public tableauLigneDeFacture: Produit[] = []
  public totalFactureTTC: number = 0;
  public price:number;
  public nomClientSelectionner : string;


  constructor(private fb: FormBuilder, private factureService: ServiceFacture) {
    this.initForm();
    this.initFormClient();
  }
  public entreprise: Entreprise;
  public client: ClientEnregistrer[]=[];
  public produit: ProduitEnregistrer[]=[];
  ngOnInit() {

    this.entreprise = JSON.parse(window.sessionStorage.getItem("entreprise"))
    this.client = JSON.parse(window.sessionStorage.getItem("clientEntreprise"))
    this.produit = JSON.parse(window.sessionStorage.getItem("produitEntreprise"))
    console.log(this.entreprise,this.client,this.produit)

  }


  public initFormClient() {
    this.formChoixClient = this.fb.group({
      clientChoisi: [[]]
    })
  }
  public initForm() {
    this.form = this.fb.group({
      champ: this.fb.array([

      ])
    })
  }
  get champ(): FormArray {
    return this.form.get("champ") as FormArray
  }

  nouveauChamp(): FormGroup {
    return this.fb.group({
      quantite: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      prixUnitaireHT: ['',],
    })
  }


  ajoutChamp() {
    this.champ.push(this.nouveauChamp());

  }

  //SUPPRIMER UN CHAMP 
  suppChamp(i: number) {
    this.champ.removeAt(i);
    this.tableauLigneDeFacture.splice(i, i);
  }
  //VALIDER UN ARTCILE ET S'ASSURER QE L'UTILISATEUR EN PUISSE PAS EN RAJOUTER 2 FOIS LE MEME 
  public validLigne(indexChamp: number) {
    let valeursChamp = this.form.value.champ
    let ligne1: Produit;
    const element = valeursChamp[indexChamp];

    //SI LE TABLEAU DE LIGNE DE FACTURE EST VIDE ON AJOUTE LA PREMIERE LIGNE
    if (this.tableauLigneDeFacture.length == 0) {
      this.tableauLigneDeFacture.push(new Produit(element.quantite, element.designation, element.prixUnitaireHT))
      console.log(this.tableauLigneDeFacture + " le tableau de facture")

    } else {
      //SINON ON VERIFIE SI L ELEMENT QUI DOIT ETRE AJOUTER N'EXISTE PAS DEJA 
      for (let i = 0; i < this.tableauLigneDeFacture.length; i++) {
        const e = this.tableauLigneDeFacture[i];
        if (e.designation == element.designation) {
          return console.log('il existe deja')
        } else {
          ligne1 = new Produit(element.quantite, element.designation, element.prixUnitaireHT)
          console.log(ligne1)

        }
      }
      this.tableauLigneDeFacture.push(ligne1);
    }
    //ON RENITIALISE LE TOTAL DE FACTURE TTC
    this.totalFactureTTC = 0;
    //ON CALCULE LE TOTAL DE LA FACTURE EN TTC 
    for (let i = 0; i < this.tableauLigneDeFacture.length; i++) {
      const element = this.tableauLigneDeFacture[i];
      this.totalFactureTTC =this.totalFactureTTC + (element.quantite * element.prix) *1.2
    }
  }

  // FONCTIONNE POUR AUTOCOMPLETER LE PRIX 
  public getPrice(designatiion :any,i:number){
    this.form.get('champ').valueChanges.subscribe((value) => console.log(value))
    for (let e = 0; e < this.produit.length; e++) {
      const element = this.produit[e];
      
      if(element.designation == designatiion.toLowerCase()){
        let prix = element.prix;
        (<FormArray>this.form.get('champ')).controls[i].get('prixUnitaireHT').setValue(prix)
        break;
      }else{
        this.price = 0
      }
    }
  }
  public getClient( client: string){
    this.nomClientSelectionner= client;
  }
  //VALIDIATION ET ENREGISTREMENT DE LA FACTURE
  onSubmit() {
    let facture: Facture;
    facture = new Facture(this.tableauLigneDeFacture,this.nomClientSelectionner)
    console.log(facture)
    console.log(this.nomClientSelectionner)
    console.log(facture)
    this.factureService.enregistrerFacture(facture)
      .subscribe((param: any) => {
        console.log(param)
      })
  }

}

