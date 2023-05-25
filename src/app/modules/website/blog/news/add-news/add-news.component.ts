import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ValidationError, FilePreviewModel } from 'ngx-awesome-uploader';
import { Observable, of, delay } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { RequestsService } from 'src/app/services/requests.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Profile } from 'src/app/models/interfaces/profile';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private request: RequestsService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {}
  status: any;
  categorys: any;
  urlYoutube: string;
  viewYoutube:SafeResourceUrl;
  ngOnInit(): void {
    this.getData();
    this.getProfile();
  }
  profile: Profile = {
    name: '',
    thumbnail: '',
  };
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    title: new UntypedFormControl(),
    detail: new UntypedFormControl(''),
    front:new UntypedFormControl(0),
    content: new UntypedFormControl(''),
    image1: new UntypedFormControl(''),
    image2: new UntypedFormControl(''),
    image3: new UntypedFormControl(''),
    vyoutube: new UntypedFormControl(),
    state_id: new UntypedFormControl(1),
    category_id: new UntypedFormControl(0),
  });
  inputImgSelected: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '10rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'fontName',
      ],
      [
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
    toolbarPosition: 'top',
  };
  create() {
    this.api.createNews(this.primaryForm).subscribe(
      (response) => {
        this.toastr.success('Creada correctamente', 'Noticias');
        setTimeout(() => {
          this.router.navigate(['/noticias/listado']);
        }, 2000);
      },
      (error) => {
        this.toastr.warning(
          error.error.mistakes,
          'Tenemos un error'
        );
        this.request.setCode(error);
      }
    );
  }
  getData() {
    this.api.getCategorys().subscribe(
      (response) => {
        this.categorys = response.data;
      },
      (error) => {
        this.error = error;
      }
    );

    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
  getProfile() {
    this.api.getProfile().subscribe((response) => {
      var data = response.data;
      this.profile = data as Profile;
    });
  }
  onSelectedImage(e: any) {
    console.log('Imagen seleccionada' + e);
    this.primaryForm.get(this.inputImgSelected)?.setValue(e);
  }
  openRepository(inputTag: string, md: any) {
    this.inputImgSelected = inputTag;
    this.modal.open(md, {
      size: 'xl',
    });
  }
  addVideoYoutube() {
    if (this.validURL(this.urlYoutube)) {
      var youtube = this.getVideoIframe(this.urlYoutube);
      console.log(youtube['changingThisBreaksApplicationSecurity']);
      this.primaryForm.get('vyoutube').setValue(youtube['changingThisBreaksApplicationSecurity']);
      this.urlYoutube="";
      var url: string =this.primaryForm.get('vyoutube').value;
      this.viewYoutube=this._sanitizer.bypassSecurityTrustResourceUrl(url);
      this.modal.dismissAll();
    } else {
      this.toastr.warning(
        'El link de acceso a youtube, no es valido',
        'Error en el link'
      );
      this.urlYoutube="";
      this.modal.dismissAll();
    }
  }
  getVideoIframe(url) {
    var video, results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }
  validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  openYoutube(inputTag: string, md: any) {
    this.modal.open(md, {
      size: 'md',
    });
  }
}
