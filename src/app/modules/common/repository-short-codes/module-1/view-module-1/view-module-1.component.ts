import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Icons } from 'src/app/models/interfaces/icons';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-view-module-1',
  templateUrl: './view-module-1.component.html',
  styleUrls: ['./view-module-1.component.css']
})
export class ViewModule1Component implements OnInit {

  constructor(private modal: NgbModal, private api: ApiService, private toast: ToastrService, private request: RequestsService, private router: Router) { }
  status: any;
  @Output()
  shortcode = new EventEmitter<string>();

  @Output()
  onSave = new EventEmitter<boolean>();

  @Input()
  id: number;

  editor1: Editor;
  editor2: Editor;
  editor3: Editor;
  editor4: Editor;
  editor5: Editor;
  editor6: Editor;
  t1: boolean;
  t2: boolean;
  t3: boolean;
  t4: boolean;
  t5: boolean;
  t6: boolean;
  icoSelected?: any;
  ngOnInit(): void {
    if (this.id > 0) {
      this.getExtension(this.id);
    }
    this.getData();
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();
    this.editor4 = new Editor();
    this.editor5 = new Editor();
    this.editor6 = new Editor();
  }
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    state_id: new UntypedFormControl(1),
    module: new UntypedFormControl(1),
    style1: new UntypedFormControl('color: #4609E8'),
    style2: new UntypedFormControl('color: #4609E8'),
    style3: new UntypedFormControl('color: #4609E8'),
    style4: new UntypedFormControl('color: #4609E8'),
    style5: new UntypedFormControl('color: #4609E8'),
    style6: new UntypedFormControl('color: #4609E8'),
    ico1: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    ico2: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    ico3: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    ico4: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    ico5: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    ico6: new UntypedFormControl('fa-solid fa-computer fa-2x'),
    t1: new UntypedFormControl('Este es el titulo.'),
    t2: new UntypedFormControl('Este es el titulo.'),
    t3: new UntypedFormControl('Este es el titulo.'),
    t4: new UntypedFormControl('Este es el titulo.'),
    t5: new UntypedFormControl('Este es el titulo.'),
    t6: new UntypedFormControl('Este es el titulo.'),
    p1: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
    p2: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
    p3: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
    p4: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
    p5: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
    p6: new UntypedFormControl('Este contenido, se presenta a modo de demostración, para que nuestros usuarios puedan personalizar sus sitios web, de una manera facil e intuitiva.'),
  });
  showInput(input: string) {
    switch (input) {
      case "t1":
        this.t1 = !this.t1;
        break;
      case "t2":
        this.t2 = !this.t2;
        break;
      case "t3":
        this.t3 = !this.t3;
        break;
      case "t4":
        this.t4 = !this.t4;
        break;
    }
  }
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  toolbarh: Toolbar = [
    // default value
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  openModal(md: any, ico: string, size: string = "mg") {
    this.icoSelected = ico;
    this.modal.open(md, { size: size });
  }
  selected(objIco: Icons) {
    console.log(objIco);
    switch (this.icoSelected) {
      case "ico1":
        this.form.get('style1').setValue("color:" + objIco.color);
        this.form.get('ico1').setValue(objIco.name + " " + objIco.size);
        break;
      case "ico2":
        this.form.get('style2').setValue("color:" + objIco.color);
        this.form.get('ico2').setValue(objIco.name + " " + objIco.size);
        break;
      case "ico3":
        this.form.get('style3').setValue("color:" + objIco.color);
        this.form.get('ico3').setValue(objIco.name + " " + objIco.size);
        break;
      case "ico4":
        this.form.get('style4').setValue("color:" + objIco.color);
        this.form.get('ico4').setValue(objIco.name + " " + objIco.size);
        break;
    }
  }
  getExtension(id: number) {
    this.api.getExtension(id).subscribe(
      (response) => {
        this.toast.info('Complemento encontrado');
        this.form.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Producto no encontrado');
        this.modal.dismissAll();
      }
    );
  }
  getData() {
    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },);
  }
  save() {
    if (this.id > 0) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    this.api.createExtentions(this.form).subscribe(
      (response) => {
        this.toast.success('Creado correctamente', 'Complemento');
        var data = response.data as any;
        this.shortcode.emit('[bcode id=' + data.id + ' m=1]');
        this.onSave.emit(true);
        this.router.navigate(["sitio-web/complementos/listar"]);
        this.modal.dismissAll();
      },
      (error) => {
        console.log('advertencia');
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'Ocurrio un error al crear el complemento, verifique'
        );
      }
    );
  }
  update() {
    this.api.updateExtensions(this.form).subscribe(
      (response) => {
        this.toast.success('Modificado correctamente', 'Complemento');
        var data = response.data as any;
        this.shortcode.emit('[bcode id=' + data.id + ' m=1]');
        this.onSave.emit(true);
        this.router.navigate(["sitio-web/complementos/listar"]);
        this.modal.dismissAll();
      },
      (error) => {
        console.log('advertencia');
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'Ocurrio un error al modificar el complemento, verifique'
        );
      }
    );
  }

}
