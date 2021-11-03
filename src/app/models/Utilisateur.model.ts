export class Utilisateur {
  public id:number;
  public name: string;
  public firstName: string;
  public email: string;
  public password: number;
  public dateOfBirth: Date;
  

  constructor(id:number,
    name: string,
    firstName: string,
    email: string,
    password: number,
    dateOfBirth: Date,
  ) {
    this.id=id;
    this.name = name;
    this.firstName = firstName
    this.email = email
    this.password = password
    this.dateOfBirth = dateOfBirth
  
  }

}
