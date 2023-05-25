import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavsComponent } from './config/navs/navs.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AddNewsComponent } from './blog/news/add-news/add-news.component';
import { EditNewsComponent } from './blog/news/edit-news/edit-news.component';
import { ListNewsComponent } from './blog/news/list-news/list-news.component';
import { AddWebPageComponent } from './content/add-web-page/add-web-page.component';
import { EditWebPageComponent } from './content/edit-web-page/edit-web-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { NgFallimgModule } from 'ng-fallimg';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';
import { RepositoryImageModule } from '../common/repository-image/repository-image.module';
import { EditorHtmlModule } from '../common/editor-html/editor-html.module';
import { AddCategoryComponent } from './blog/categorys/add-category/add-category.component';
import { EditCategoryComponent } from './blog/categorys/edit-category/edit-category.component';
import { ListCategoryComponent } from './blog/categorys/list-category/list-category.component';
import { ContentComponent } from './content/content.component';
import { BlogComponent } from './blog/blog.component';
import { NavViewComponent } from './extensions/nav-view/nav-view.component';
import { ListWebPageComponent } from './content/list-web-page/list-web-page.component';
import { ConfigComponent } from './config/config.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { ListExtensionsComponent } from './extensions/list-extensions/list-extensions.component';
import { RepositoryShortCodesModule } from '../common/repository-short-codes/repository-short-codes.module';
import { AddExtensionsComponent } from './extensions/add-extensions/add-extensions.component';
import { EditExtensionsComponent } from './extensions/edit-extensions/edit-extensions.component';


@NgModule({
  declarations: [
    WebsiteComponent,
    NavViewComponent,
    NavsComponent,
    AddWebPageComponent,
    EditWebPageComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    ListNewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    ListNewsComponent,
    ContentComponent,
    ListWebPageComponent,
    ConfigComponent,
    BlogComponent,
    ExtensionsComponent,
    AddExtensionsComponent,
    EditExtensionsComponent,
    ListExtensionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebsiteRoutingModule,
    NgImageSliderModule,
    HttpClientModule,
    AngularEditorModule,
    NgbModule,
    ColorPickerModule,
    NgDynamicBreadcrumbModule,
    EditorHtmlModule,
    RepositoryImageModule,
    RepositoryShortCodesModule,
    NgFallimgModule.forRoot({
      default: '/assets/img/default.jpg',
      logo: '/assets/img/logo-company-default.png',
    }),
    ToastrModule.forRoot(),
  ],
  exports:[
    WebsiteComponent,
  ]
})
export class WebsiteModule { }
