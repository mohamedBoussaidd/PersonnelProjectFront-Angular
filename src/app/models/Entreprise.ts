export class Entreprise {


  constructor(
    name: string, 
    adress: string, 
    email: string, 
    number: string, 
    description: string
) {
    this.name = name
    this.adress = adress
    this.email = email
    this.number = number
    this.description = description
  }
    public name:string;
    public adress:string;
    public email :string;
    public number :string;
    public description:string;

  
}