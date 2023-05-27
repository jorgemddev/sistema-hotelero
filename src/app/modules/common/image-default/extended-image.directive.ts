import { Directive, ElementRef, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImageDefaultConfig } from './image-default.module';

@Directive({
  selector: 'img[defaultImage]'
})
export class ExtendedImageDirective implements OnChanges {

  constructor(private el: ElementRef,
    @Inject('defaultImageConfig') private config: ImageDefaultConfig) {
  }
  @Input() src: string;
  @Input() defaultImage: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] || changes['defaultImage']) {
      const imageKey = this.defaultImage|| 'default';
      const imageUrl = this.src || this.config.defaultImages[imageKey] || '';

      this.loadImage(imageUrl);
    }
  }
  private loadImage(url: string): void {
    const imgElement: HTMLImageElement = this.el.nativeElement;
    imgElement.src = url;
    imgElement.onerror = () => {
      imgElement.src = this.config.defaultImages['default'] || '';
    };
  }
}
