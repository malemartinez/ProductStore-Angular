import { Directive , ElementRef, HostListener } from '@angular/core';
// import { threadId } from 'worker_threads';

//las directivas sirven para modificar el DOM aunque NO es uan buena práctica
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  //sirve para escuchar eventos de teclado o mouse y hacer cambios de estilo
  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.backgroundColor = 'gray';
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor(
    private element: ElementRef
  ) {
    // this.element.nativeElement.style.backgroundColor = 'red';
  }

}
