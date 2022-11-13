import { Component, OnInit , Input , Output, EventEmitter , OnChanges , AfterViewInit , OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit , OnChanges , OnDestroy , AfterViewInit {

 @Input() imgChild : string = " ";
 @Output() loaded = new EventEmitter<string>()

 imageDefault ="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";

 constructor() {
  // before render
  // NO async -- once time
  // console.log('constructor', 'imgValue =>', this.imgChild);
}

ngOnChanges() {
  // before - during render
  // changes inputs -- multiples times
  // console.log('ngOnChanges', 'imgValue =>', this.imgChild);
}

ngOnInit(): void {
  // before render
  // async - fetch -- once time
  // console.log('ngOnInit', 'imgValue =>', this.imgChild);
}

ngAfterViewInit() {
  // after render
  // handler children -- once time
//   console.log('ngAfterViewInit');
}

ngOnDestroy() {
  // delete -- once time
//   console.log('ngOnDestroy');
}

  imgError(){
    this.imgChild = this.imageDefault;
  }

  imgLoaded(){
    // console.log("loaded del hijo")
    this.loaded.emit(this.imgChild)
  }
}

