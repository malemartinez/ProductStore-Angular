import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

 @Input() imgChild : string = " ";
 @Output() loaded = new EventEmitter<string>()

 imageDefault ="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";

  constructor() { }

  ngOnInit(): void {
  }

  imgError(){
    this.imgChild = this.imageDefault;
  }

  imgLoaded(){
    console.log("loaded del hijo")
    this.loaded.emit(this.imgChild)
  }

}
