const nickname : String = "Aleja";

const sum = (a:number , b:number)=>{
  return a+ b
}

class Person {

  private name:String;
  private lastname:String;

  constructor(name:String , lastname:String){
    this.name = name;
    this.lastname = lastname;
  }

}

const Aleja = new Person("aleja", "martinez")
