import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorHtmlComponent } from './editor-html.component';
import { UploadComponent } from './custom/upload/upload.component';
import { VideoComponent } from './custom/video/video.component';
import { YoutubeComponent } from './custom/youtube/youtube.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositoryImageModule } from '../repository-image/repository-image.module';
import { ShortCodeComponent } from './custom/shortcode/shortcode.component';
import { ShortCodesComponent } from './short-codes/short-codes.component';
import { GalleryIconsModule } from '../gallery-icons/gallery-icons.module';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EmojiComponent } from './custom/emoji/emoji.component';



@NgModule({
  declarations: [
    EditorHtmlComponent,
    UploadComponent,
    VideoComponent,
    YoutubeComponent,
    ShortCodeComponent,
    ShortCodesComponent,
    EmojiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    RepositoryImageModule,
    GalleryIconsModule,
    NgbPaginationModule,
  ],
  exports: [
    EditorHtmlComponent,
    UploadComponent,
    VideoComponent,
    YoutubeComponent
  ]
})
export class EditorHtmlModule { }
