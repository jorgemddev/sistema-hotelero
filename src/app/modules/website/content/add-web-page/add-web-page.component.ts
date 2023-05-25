import { HttpEvent } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { Responses } from 'src/app/models/interfaces/responses';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-add-web-page',
  templateUrl: './add-web-page.component.html',
  styleUrls: ['./add-web-page.component.css'],
})
export class AddWebPageComponent implements OnInit {
  router: any;
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private request: RequestsService
  ) {}

  @Input() iconClass = 'fa-solid fa-photo-film';
  @Input() title = '';
  @Output() buttonClick = new EventEmitter();
  editorHeight:string="250px";
  status: any;
  categorys: any;
  ngOnInit(): void {
    this.getData();
    this.getProfile();
  }
  profile: Profile = {
    name: '',
    thumbnail: '',
  };
  response: Responses = {
    status: 'loading',
    msg: 'Cargando...',
    data: {},
    mistakes: {},
  };
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    title: new UntypedFormControl(),
    path: new UntypedFormControl(''),
    mdescription: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    state_id: new UntypedFormControl(1),
    category_id: new UntypedFormControl(1),
  });
  inputImgSelected: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '35rem',
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
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
    toolbarPosition: 'top',
  };
  create() {
    this.api.createPage(this.primaryForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toastr.success('Pagina dinamica', 'Creada correctamente');
        this.router.navigate(['sitio-web/contenido/listar']);
      },
      (error) => {
        this.request.setCode(error);
        this.error = error;
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
}
