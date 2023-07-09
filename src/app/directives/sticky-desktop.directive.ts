import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[stickyDektop]'
})
export class StickyDesktopDirective {
  private navElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.navElement = this.elementRef.nativeElement;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 0) {
      this.renderer.addClass(this.navElement, 'sticky');
    } else {
      this.renderer.removeClass(this.navElement, 'sticky');
    }
  }
}