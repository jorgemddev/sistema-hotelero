import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorEmojiComponent } from './ngx-editor-emoji/ngx-editor-emoji.component';
import { GalleryEmojiComponent } from './gallery-emoji/gallery-emoji.component';



@NgModule({
  declarations: [
    NgxEditorEmojiComponent,
    GalleryEmojiComponent
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NgxEditorEmojiComponent
  ]
})
export class EmojiModule { }
