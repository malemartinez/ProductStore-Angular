import { Component } from '@angular/core';

import { product } from './products.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  btnDisabled = true;

  name = "Aleja";
  age = 25;
  img = ""
  // img = "https://www.w3schools.com/howto/img_avatar.png"

  warriors :String[]= ["Edwar", "Mauro" , "Jose" , "Mary", "Aleja" ]
  newWarrior = "";

  box = {
    width: 100,
    height : 100,
    background: 'red'
  }

  // logica de eventos para oir componente hijo
  onLoaded(img :string){
    console.log("loaded del padre", img)
  }

  products: product [] = [
    {
      name: 'EL mejor juguete',
      price: 50000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 1000000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 20000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 400000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 150000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 200000,
      image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/glasses.jpg'
    }
  ]

  toggleButton(){
    this.btnDisabled = !this.btnDisabled;
  }
  incrementAge(){
    this.age +=1
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  onKeyUp(event: Event) {
    const element = event.target as HTMLInputElement;
    this.name = element.value;
    }

  addName(){
    this.warriors.push(this.newWarrior)
    this.newWarrior = " "
  }
  deleteWarrior(index:number){
    this.warriors.splice(index , 1)
  }
}
