import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Navs } from 'src/app/models/interfaces/navs';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css'],
})
export class NavsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private request: RequestsService,
    private routeActive: ActivatedRoute,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getNavs();
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        console.log(params.get('id'));
        this.getData();
        var id = params.get('id');
        this.getNav(id);
      }
    });
  }
  paths_sections: any = [];
  paths_category: any = [];
  paths_news: any = [];
  ancla: any = -1;
  addAncla: boolean = false;
  items: Navs;
  navs: any;
  link: string;
  safeLink: SafeResourceUrl;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    path: new UntypedFormControl(),
    type: new UntypedFormControl(1),
    target: new UntypedFormControl(1),
    navs_id: new UntypedFormControl(0),
    orderby: new UntypedFormControl('0'),
  });
  secondForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  inputImgSelected: any;

  save() {
    if (this.primaryForm.get('id')?.value > 0) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    this.api.createNavs(this.primaryForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Creado correctamente', 'Items de menu');
        this.getNavs();
        this.getData();
      },
      (error) => {
        console.log('advertencia');
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'Ocurrio un error al crear el menu, verifique'
        );
      }
    );
  }
  update() {
    this.api.updateNavs(this.primaryForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Modificado correctamente', 'Items de menu');
        this.getNavs();
        this.getData();
      },
      (error) => {
        this.toast.warning(error.error.mistakes,
          'No se pudo modificar'
        );
        this.request.setCode(error);
      }
    );
  }
  delete() {
    this.api.deleteNavs(this.secondForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success(
          'Este item fue  eliminado correctamente',
          'Item de menu'
        );
        this.getNavs();
        this.getData();
        this.modal.dismissAll();
      },
      (error) => {
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'NO fue posible eliminar este item'
        );
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['sitio-web/ajustes/menus/editar/' + id]);
  }
  goToCreate() {
    console.log('create');
    this.router.navigate(['sitio-web/ajustes/menus']);
  }
  getData() {
    this.api.getPaths().subscribe((response) => {
      var data = response.data as any;
      this.paths_news = data.news;
      this.paths_category = data.category;
      this.paths_sections = data.pages;
    });
    this.api.getAllNavs().subscribe(
      (response) => {
        this.navs = response.data;
        console.log(this.items);
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  getNav(id: any) {
    this.api.getNav(id).subscribe(
      (response) => {
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  getNavs() {
    this.api.getNavs().subscribe(
      (response) => {
        this.items = response.data as Navs;
        console.log(this.items);
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  selectedPath(item: any, resource = 0) {
    var target = this.primaryForm.get('target').value;
    var destination = '';
    if (target == 1) {
      switch (resource) {
        case 1:
          destination = 'noticias/articulo/' + item.id + '/' + item.path;
          break;

        case 2:
          destination = 'noticias/categoria/' + item.id + '/' + item.path;
          break;
        case 3:
          destination = 'p/' + item.id + '/' + item.path;
          break;
        case 4:
          console.log("select" + this.ancla);
          var path = (this.ancla > 0) ? 'p/' + this.ancla + '/' + this.paths_sections.find(element => element.id == this.ancla).path + '#' + this.link : 'home#' + this.link;
          destination = path;
          break;
        default:
          break;
      }
      this.primaryForm.get('path').setValue(destination);
    } else {
      if (this.validURL(this.link)) {
        this.safeLink = this._sanitizer.bypassSecurityTrustResourceUrl(
          this.link
        );
        this.primaryForm
          .get('path')
          .setValue(this.safeLink['changingThisBreaksApplicationSecurity']);
      } else {
        console.log(this.link);
        this.toast.warning(
          'El destino ingresado no tiene un formato valido',
          'Agregar enlace externo'
        );
      }
    }
    this.modal.dismissAll();
  }
  onSelectedImage(e: any) {
    console.log('Imagen seleccionada' + e);
    this.primaryForm.get(this.inputImgSelected)?.setValue(e);
  }
  openModal(md: any) {
    var size = this.primaryForm.get('target').value == 1 ? 'md' : 'sm';
    this.modal.open(md, {
      size: size,
    });
  }
  openDelete(id: number, md: any) {
    this.secondForm.get('id').setValue(id);
    this.modal.open(md, {
      size: 'md',
    });
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
  validAncla(str: any) {
    console.log("es:" + str.target.value);
    var value = str.target.value;
    var pattern = new RegExp('(\\[-a-z\\d_]*)?$', 'i');
    console.log(pattern.test(value))
    return pattern.test(str);
  }
  validateLinkAncla(event: any) {
    console.log(event);
    if (this.validAncla(event)) {
      this.addAncla = true;
    } else {
      this.addAncla = false;
      this.toast.warning(
        'El destino ingresado no tiene un formato valido',
        'Agregar enlace externo'
      );
    }
  }
}
