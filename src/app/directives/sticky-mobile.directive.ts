import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[stickyMobile]'
})
export class StickyMobileDirective implements OnInit {
  @HostBinding('class.sticky') isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.setSticky();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setSticky();
  }

  ngOnInit() {
    this.setSticky();
  }

  setSticky() {
    const isMobileDevice = window.innerWidth <= 768; // Verificar si es un dispositivo móvil según el ancho de la ventana
    this.isSticky = isMobileDevice && window.pageYOffset >= 0; // Agregar la clase sticky cuando se desplace la página en dispositivos móviles
  }
}