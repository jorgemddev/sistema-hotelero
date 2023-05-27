import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedImageDirective } from './extended-image.directive';



@NgModule({
  declarations: [
    ExtendedImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ExtendedImageDirective],
})
export class ImageDefaultModule { 
  static forRoot(config: ImageDefaultConfig): ModuleWithProviders<ImageDefaultModule> {
    return {
      ngModule: ImageDefaultModule,
      providers: [
        { provide: 'defaultImageConfig', useValue: config },
      ],
    };
  }
}


export interface ImageDefaultConfig {
  defaultImages: { [key: string]: string };
}
