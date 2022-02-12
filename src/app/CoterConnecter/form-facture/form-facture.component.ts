import { Router } from '@angular/router';
import { ProduitEnregistrer } from 'src/app/models/ProduitEnregistrer';
import { Produit } from './../../models/Produit';
import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { Facture } from './../../models/Facture';
import { ServiceFacture } from '../common/ServiceFacture.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entreprise } from 'src/app/models/Entreprise';


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
  public price: number;
  public nomClientSelectionner: string;


  constructor(private fb: FormBuilder, private factureService: ServiceFacture, private router: Router) {
    this.initForm();
    this.initFormClient();
  }
  public entreprise: Entreprise;
  public client: ClientEnregistrer[] = [new ClientEnregistrer('-', '', '', '', '')];
  public produit: ProduitEnregistrer[] = [new ProduitEnregistrer('-', 0, 0)];
  public idEntreprise: number;
  public messageErreur: string = "";

  ngOnInit() {

    this.entreprise = JSON.parse(window.sessionStorage.getItem("entreprise"))
    for (let i = 0; i < JSON.parse(window.sessionStorage.getItem("clientEntreprise")).length; i++) {
      const element = JSON.parse(window.sessionStorage.getItem("clientEntreprise"))[i];
      this.client.push(element)

    }
    for (let i = 0; i < JSON.parse(window.sessionStorage.getItem("produitEntreprise")).length; i++) {
      const element = JSON.parse(window.sessionStorage.getItem("produitEntreprise"))[i];
      this.produit.push(element)

    }
    this.idEntreprise = JSON.parse(window.sessionStorage.getItem("idEntreprise"))


  }

  /* FORMULAIRE CLIENT */
  public initFormClient() {
    this.formChoixClient = this.fb.group({
      clientChoisi: ['-', []]
    })
  }
  public initForm() {
    this.form = this.fb.group({
      nCommande: ["", []],
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
      prixUnitaireHT: ['',[]],
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

    } else {
      //SINON ON VERIFIE SI L ELEMENT QUI DOIT ETRE AJOUTER N'EXISTE PAS DEJA 
      for (let i = 0; i < this.tableauLigneDeFacture.length; i++) {
        const e = this.tableauLigneDeFacture[i];
        if (e.designation == element.designation) {
          return this.messageErreur = " LE DERNIER PRODUIT QUE VOUS AVEZ AJOUTER EST DÉJA PRESENT ";
        } else {
          ligne1 = new Produit(element.quantite, element.designation, element.prixUnitaireHT)
        }
      }
      this.tableauLigneDeFacture.push(ligne1);
    }
    //ON RENITIALISE LE TOTAL DE FACTURE TTC
    this.totalFactureTTC = 0;
    //ON CALCULE LE TOTAL DE LA FACTURE EN TTC 
    for (let i = 0; i < this.tableauLigneDeFacture.length; i++) {
      const element = this.tableauLigneDeFacture[i];
      this.totalFactureTTC = this.totalFactureTTC + (element.quantite * element.prix) * 1.2
    }
  }

  // FONCTIONNE POUR AUTOCOMPLETER LE PRIX 
  public getPrice(designatiion: string, i: number) {
    console.log(" designation transimise via la getprice: " + designatiion)

    let designation= designatiion.toLowerCase();
    console.log(" designation transimise via la getprice transformer : " + designation)

    this.form.get('champ').valueChanges.subscribe((value) => {
      console.log(" value lors du changement: " + value)
    })
    for (let e = 0; e < this.produit.length; e++) {
      const element = this.produit[e];
      if (element.designation == designation) {
        console.log(" les element sont egaux")
        let prix = element.prix;
        (<FormArray>this.form.get('champ')).controls[i].get('prixUnitaireHT').setValue(prix)
        break;
      } else {
        console.log(" les element ne  sont pas egaux")

        this.price = 0
      }
    }
  }
  public getClient(client: string) {
    this.nomClientSelectionner = client;
  }
  //VALIDIATION ET ENREGISTREMENT DE LA FACTURE
  onSubmit() {
    let facture: Facture;
    let numeroCommande: string = this.form.get('nCommande').value
    facture = new Facture(this.tableauLigneDeFacture, this.nomClientSelectionner, numeroCommande)

    this.factureService.enregistrerFacture(facture, this.idEntreprise)
      .subscribe((param: any) => {
        this.router.navigate(['/GererEntreprise'])
      }, (err) => {
        console.log(err)
        this.messageErreur = err.error.message;
      })

  }

}

