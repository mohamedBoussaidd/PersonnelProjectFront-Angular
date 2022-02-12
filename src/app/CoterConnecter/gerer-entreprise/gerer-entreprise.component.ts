import { ServicePdf } from './../common/ServicePdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceClient } from './../common/ServiceClient';
import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServiceEntreprise } from '../common/ServiceEntreprise';
import { ProduitEnregistrer } from 'src/app/models/ProduitEnregistrer';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProduit } from '../common/ServiceProduit.service';
import { Facture } from 'src/app/models/Facture';
import { Router } from '@angular/router';
import { ServiceFacture } from '../common/ServiceFacture.service';
@Component({
  selector: 'app-gerer-entreprise',
  templateUrl: './gerer-entreprise.component.html',
  styleUrls: ['./gerer-entreprise.component.css']
})
export class GererEntrepriseComponent implements OnInit {

  constructor(private serviceEntreprise: ServiceEntreprise, private fb: FormBuilder, private serviceProduit: ServiceProduit, private serviceClient: ServiceClient, private http: HttpClient,
    private servicePdf: ServicePdf, private router: Router, private serviceFacture: ServiceFacture,) {
    this.initFormProduit();
    this.initFormClient();
    this.initFormModifProduit();
  }

  public form: FormGroup;
  public formClient: FormGroup;
  public formModifProduit: FormGroup;
  public tableauProduits: ProduitEnregistrer[] = []
  public tableauClients: ClientEnregistrer[] = []
  public listProduits: ProduitEnregistrer[] = []
  public listClients: ClientEnregistrer[] = []
  public listFactures: Facture[] = []
  public messageErreur: string;
  public messageReussie: string;
  public entreprise: any;
  public idEntreprise: number;
  public displayDetails: boolean = false;
  public displayMenu: boolean = false;
  public formFacture: boolean = false;
  public afficherListeFacture: boolean = false;
  public afficherListeProduit: boolean = false;
  public afficherListeClient: boolean = false;
  public afficherFormModifProduit: boolean = false;
  public idProduitModifier: number;



  ngOnInit(): void {
    // ON RECUPERE L 'ID DE L'ENTREPRISE EN CHOISI
    this.idEntreprise = JSON.parse(window.sessionStorage.getItem("idEntreprise"))


    //RECUPERATION ET ENREGISTREMENT DE L'ENTREPRISE 
    this.serviceEntreprise.getEntreprise(this.idEntreprise).subscribe((param) => {
      this.entreprise = param;
      // par defaut, on enlève une potentiel entreprise presente
      window.sessionStorage.removeItem("entreprise");
      // on enregistre celui qu'on veut conserver
      window.sessionStorage.setItem("entreprise", JSON.stringify(this.entreprise));
    });

    //RECUPERATION ET ENREGISTREMENT DES PRODUITS
    this.serviceProduit.getAllProduit(this.idEntreprise).subscribe((param) => {
      this.listProduits = param;

      // par defaut, on enlève un potentiel produit present
      window.sessionStorage.removeItem("produitEntreprise");
      // on enregistre celui qu'on veut conserver
      window.sessionStorage.setItem("produitEntreprise", JSON.stringify(this.listProduits));
    });

    //RECUPERATION ET ENREGISTREMENT DES CLIENTS 
    this.serviceClient.getAllClient(this.idEntreprise).subscribe((param) => {
      this.listClients = param;
      // par defaut, on enlève un potentiel client present
      window.sessionStorage.removeItem("clientEntreprise");
      // on enregistre celui qu'on veut conserver
      window.sessionStorage.setItem("clientEntreprise", JSON.stringify(this.listClients));
    });
    //RECUPERATION ET ENREGISTREMENT DES FACTURES 
    this.serviceFacture.getAllFacture(this.idEntreprise).subscribe((param) => {
      this.listFactures = param;
    })
  }
  // ------------------------------------------------------------------------------
  // création des formulaire
  public initFormModifProduit() {
    this.formModifProduit = this.fb.group({
      stock: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    })
  }
  public initFormProduit() {
    this.form = this.fb.group({
      stock: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    })
  }
  public initFormClient() {
    this.formClient = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      complementAdresse: ['', [Validators.required]],
    })
  }

  // -----------------------------------produits---------------------
  //afficher les produits
  public AfficherProduit() {
    this.afficherListeFacture = false
    this.afficherListeClient = false
    this.afficherListeProduit = !this.afficherListeProduit;
  }
  //permet de remplir le modal avec les informations du produit
  public remplirForm(item: ProduitEnregistrer, idItem: number) {
    this.idProduitModifier = idItem;
    this.formModifProduit.get('designation').setValue(item.designation)
    this.formModifProduit.get('prix').setValue(item.prix)
    this.formModifProduit.get('stock').setValue(item.stock)
  }
  // PRODUIT MODIFIER/SUPPRIMER
  public modifierProduit() {
    let produitModifier: ProduitEnregistrer = new ProduitEnregistrer(
      this.formModifProduit.get('designation').value.toLowerCase(),
      this.formModifProduit.get('prix').value,
      this.formModifProduit.get('stock').value);
    this.serviceProduit.miseAJour(produitModifier, this.idProduitModifier).subscribe((param) => {
      this.messageReussie = param.message;
    }, (err) => {
      this.messageErreur = err.error.message;
    });
    this.reload(2000)
  }
  public supprimerProduit(idProduit: number) {
    if (window.confirm(' Voulez vous vraiment surpprimer ce produit ')) {
      this.serviceProduit.supprimerProduit(idProduit).subscribe((param) => {
        this.messageReussie = param.message;
      }, (err) => {
        this.messageErreur = err.message;
      });
      this.reload(2000)
    }
  }
  //VALIDER UN PRODUIT ET S'ASSURER QE L'UTILISATEUR EN PUISSE PAS EN RAJOUTER 2 FOIS LE MEME 
  public onSubmit() {
    let produit: ProduitEnregistrer = new ProduitEnregistrer(
      this.form.get('designation').value.toLowerCase(),
      this.form.get('prix').value,
      this.form.get('stock').value);
    // ON ENREGISTRE LES PRODUITS VIA LE SERVICE
    this.serviceProduit.enregistrerProduits(produit, this.idEntreprise).subscribe((param: any) => {
      this.messageReussie = param.message;
    }, (err) => {
      this.messageErreur = err.error.message;
    });
    this.reload(1500)
  }
  //--------------------Client----------------------------------------------
  public AfficherClient() {
    this.afficherListeFacture = false
    this.afficherListeProduit = false
    this.afficherListeClient = !this.afficherListeClient;
  }
  // PRODUIT MODIFIER/SUPPRIMER Client
  public modifierClient(idClient: number) {
    // recuperation des valeur des different champ 
    let nom = (<HTMLInputElement>document.getElementById("nom" + idClient)).value.toLowerCase();
    // le + permet de transformer la chaine e caracterer en nombre
    let email = (<HTMLInputElement>document.getElementById("email" + idClient)).value;
    let numero = (<HTMLInputElement>document.getElementById("numero" + idClient)).value;
    let adresse = (<HTMLInputElement>document.getElementById("adresse" + idClient)).value;
    let complementAdresse = (<HTMLInputElement>document.getElementById("complementAdresse" + idClient)).value;

    // recuperation des different element html pour de la coloration
    let elementNom = (<HTMLInputElement>document.getElementById("nom" + idClient));
    let elementEmail = (<HTMLInputElement>document.getElementById("email" + idClient));
    let elementNumero = (<HTMLInputElement>document.getElementById("numero" + idClient));
    let elementAdresse = (<HTMLInputElement>document.getElementById("adresse" + idClient));
    let elementComplementAdresse = (<HTMLInputElement>document.getElementById("complementAdresse" + idClient));

    let clientModifier: ClientEnregistrer = new ClientEnregistrer(nom, email, numero, adresse, complementAdresse);
    this.serviceClient.miseAJour(clientModifier, idClient).subscribe((param) => {
      elementNom.style.borderColor = "lightgreen"
      elementEmail.style.borderColor = "lightgreen"
      elementNumero.style.borderColor = "lightgreen"
      elementAdresse.style.borderColor = "lightgreen"
      elementComplementAdresse.style.borderColor = "lightgreen"
      elementNom.style.opacity = "0.8"
      elementEmail.style.opacity = "0.8"
      elementNumero.style.opacity = "0.8"
      elementAdresse.style.opacity = "0.8"
      elementComplementAdresse.style.opacity = "0.8"
      this.messageReussie = param.message;
    }, (err) => {
      elementNom.style.borderColor = "red"
      elementEmail.style.borderColor = "red"
      elementNumero.style.borderColor = "red"
      elementAdresse.style.borderColor = "red"
      elementComplementAdresse.style.borderColor = "red"
      elementNom.style.opacity = "0.8"
      elementEmail.style.opacity = "0.8"
      elementNumero.style.opacity = "0.8"
      elementAdresse.style.opacity = "0.8"
      elementComplementAdresse.style.opacity = "0.8"
      console.log(err)
      this.messageErreur = err.error.message;
    });
    this.reload(2000)
  }
  public supprimerClient(idClient: number) {
    if (window.confirm('Voulez vous vraiment supprimer ce client ?')) {
      this.serviceClient.supprimerClient(idClient).subscribe((param) => {
        this.messageReussie = param.message;
      }, (err) => {
        this.messageErreur = err.message;
      });
      this.reload(2000)
    }
  }
  public onSubmitClient() {
    // BOUCLE POUR GERE LES CLIENTS
    let client: ClientEnregistrer = new ClientEnregistrer(
      this.formClient.get('nom').value.toLowerCase(''),
      this.formClient.get('email').value.toLowerCase(''),
      this.formClient.get('numero').value.toLowerCase(''),
      this.formClient.get('adresse').value.toLowerCase(''),
      this.formClient.get('complementAdresse').value.toLowerCase(''),
    );
    this.serviceClient.enregistrerClients(client, this.idEntreprise).subscribe((param: any) => {
      this.messageReussie = param.message;
    }, (err) => {
      this.messageErreur = err.error.message;
    });
    this.reload(1500)
  }

  public reload(time: number) {
    setTimeout(() => window.location.reload(), time);
  }
  public display(client: ClientEnregistrer) {
    // par defaut, on enlève un potentiel client present
    window.sessionStorage.removeItem("client");
    // on enregistre celui qu'on veut conserver
    window.sessionStorage.setItem("client", JSON.stringify(client));
    this.displayMenu = !this.displayMenu;
  }
  public clientDetail: ClientEnregistrer;
  //FONCTION POUR VOIR LE DETAIL DU CLIENT
  public displayDetail(client: ClientEnregistrer) {
    this.clientDetail = client
    this.displayDetails = !this.displayDetails;
  }

  // ----------------------------------Factures--------------------------------------

  public AfficherFacture() {
    this.afficherListeClient = false
    this.afficherListeProduit = false
    this.afficherListeFacture = !this.afficherListeFacture;
  }
  public telecharger(facture: any) {
    let tab = window.open();
    this.servicePdf.getPdf(facture.client.nom.replace(/\s+/g, '') + facture.numeroFacture).subscribe((param) => {
      var fichier = new Blob([param], { type: 'application/pdf' })
      const fichierUrl = URL.createObjectURL(fichier);
      tab.location.href = fichierUrl
      console.log(fichierUrl)
    }, (err) => {
      console.log(err)
    })
  }


}
