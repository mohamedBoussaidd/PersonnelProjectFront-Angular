import { ServiceFacture } from './../common/ServiceFacture.service';
import { Facture } from './../../models/Facture';
import { Produit } from '../../models/Produit';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-facture',
  templateUrl: './form-facture.component.html',
  styleUrls: ['./form-facture.component.css']
})
export class FormFactureComponent {

  form: FormGroup;
  public formClient: any;
  public montantHT: number;
  public tableauLigneDeFacture: Produit[] = []
  public totalFactureTTC: number = 0;

  constructor(private fb: FormBuilder, private factureService: ServiceFacture) {
    this.initForm();
  }
  ngOnInit() {
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
      prixUnitaireHT: ['', [Validators.required]],
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
          return console.log('il existe deja')
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
      this.totalFactureTTC = this.totalFactureTTC+element.prix
    }
  }
  //VALIDIATION DE LA FACTURE 
  onSubmit() {
    let facture: Facture;
    facture = new Facture(this.tableauLigneDeFacture)
    console.log(facture)
    this.factureService.enregistrerFacture(facture)
      .subscribe((param: any) => {
        console.log(param)
      })
  }

}

