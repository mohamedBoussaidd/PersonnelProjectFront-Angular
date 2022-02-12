export class Entreprise {

    public name:string;
    public adress:string;
    public complementAdresse:string;
    public email :string;
    public number :string;
    public numeroSiret :string;
    public description:string;
  constructor(
    name: string, 
    adress: string,
    complementAdresse:string,
    email: string, 
    number: string,
    numeroSiret:string,
    description: string
) {
    this.name = name
    this.adress = adress
    this.complementAdresse= complementAdresse
    this.email = email
    this.number = number
    this.numeroSiret =numeroSiret
    this.description = description
  }
  

  
}