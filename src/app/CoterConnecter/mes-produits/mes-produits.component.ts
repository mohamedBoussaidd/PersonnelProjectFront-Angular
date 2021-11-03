import { ServiceProduit } from './../common/ServiceProduit.service';
import { ProduitEnregistrer } from './../../models/ProduitEnregistrer';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mes-produits',
  templateUrl: './mes-produits.component.html',
  styleUrls: ['./mes-produits.component.css']
})
export class MesProduitsComponent implements OnInit {

  public form: FormGroup;
  public formClient: any;
  public tableauProduits: ProduitEnregistrer[] = []
  public messageError: string;
  constructor(private fb: FormBuilder,private serviceProduit:ServiceProduit) {
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
      stock: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    })
  }

  ajoutChamp() {
    this.champ.push(this.nouveauChamp());
  }

  //SUPPRIMER UN CHAMP 
  suppChamp(i: number) {
    this.champ.removeAt(i);
    this.tableauProduits.splice(i, i);
  }
  //VALIDER UN PRODUIT ET S'ASSURER QE L'UTILISATEUR EN PUISSE PAS EN RAJOUTER 2 FOIS LE MEME 
  public onSubmit() {
    this.tableauProduits = []
    let valeursChamp = this.form.value.champ

    for (let i = 0; i < valeursChamp.length; i++) {
      let produit1: ProduitEnregistrer;
      const element = valeursChamp[i];
      if (this.tableauProduits.length == 0) {
        console.log("je suis dans le truc pour le tableau vaut 0")
        this.tableauProduits.push(new ProduitEnregistrer(element.designation, element.prix, element.stock));
      } else {
        for (let j = 0; j < this.tableauProduits.length; j++) {
          const jelement = this.tableauProduits[j];
          if (jelement.designation == element.designation) {
            return this.messageError = "Vous esseyez d'ajouter deux fois le même produit"
          } else {
            produit1 = new ProduitEnregistrer(element.designation, element.prix, element.stock)
          }
        }
        this.tableauProduits.push(produit1)
      }
    }
    console.log(this.tableauProduits);
    this.serviceProduit.enregistrerProduits(this.tableauProduits).subscribe((param:any)=>{
      console.log(param);
    });
  }
}
  //console.log(this.tableauProduits)

/*   //ON RENITIALISE LE TOTAL DE FACTURE TTC
this.totalFactureTTC = 0;
//ON CALCULE LE TOTAL DE LA FACTURE EN TTC
for (let i = 0; i < this.tableauProduits.length; i++) {
const element = this.tableauProduits[i];
this.totalFactureTTC = this.totalFactureTTC+element.prix
} */




