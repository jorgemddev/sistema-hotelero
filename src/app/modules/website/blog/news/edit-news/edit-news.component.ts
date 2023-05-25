import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private routeActive: ActivatedRoute,
    private request:RequestsService,
    private router:Router,
    public  _sanitizer: DomSanitizer
  ) {}
  status: any;
  categorys: any;
  urlYoutube: string='';
  viewYoutube:SafeResourceUrl;

  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.getData();
      this.getProfile();
      console.log('id:' + data['id']);
      this.getNews(data['id']);
    } else {
      console.log('Se devuelve');
      this.router.navigate(['/noticias/listado']);
    }
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
    state_id: new UntypedFormControl(0),
    category_id: new UntypedFormControl(0),
  });
  inputImgSelected: any;

  getNews(id: number) {
    this.api.getNews(id).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.primaryForm.patchValue(response.data);
        var url: string =this.primaryForm.get('vyoutube').value;
        this.viewYoutube=this._sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      (error) => {
       this.request.setCode(error);
        this.router.navigate(['/noticias/listado']);
      }
    );
  }
  update() {
    this.api.updateNews(this.primaryForm).subscribe(
      (response) => {
        if (response.status == 'ok') {
          this.toastr.success('Registro modificado correctamente','¡Todo bien!');
          setTimeout(() => {
            //this.router.navigate(['/cars/adj-car/' + data.id]);
          }, 2000);
        } else {
          this.toastr.warning(
            'Ocurrio un error al procesar el contenido, verifique','Ups!'
          );
        }
      },
      (error) => {
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
        this.request.setCode(error);
      }
    );

    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
        this.primaryForm.get('state_id')?.setValue(3);
      },
      (error) => {
        this.request.setCode(error);
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
  addVideoYoutube() {
    if (this.validURL(this.urlYoutube)) {
      var youtube = this.getVideoIframe(this.urlYoutube);
      this.primaryForm.get('vyoutube').setValue(youtube['changingThisBreaksApplicationSecurity']);
      this.urlYoutube="";
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
  openRepository(inputTag: string, md: any) {
    this.inputImgSelected = inputTag;
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
