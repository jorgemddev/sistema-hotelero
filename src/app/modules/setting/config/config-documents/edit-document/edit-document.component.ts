import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Files } from 'src/app/models/interfaces/Files';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
  ) { }
  ngOnInit(): void {
    this.getModules();
    this.getTemplates();
    if (this.id > 0) {
      this.getTemplate();
    }

  }

  modules: any;
  templates: any;

  @Input()
  id: number;
  @Output()
  success = new EventEmitter<boolean>();

  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    number: new UntypedFormControl(0),
    fhater:new UntypedFormControl('1'),
    template_documents_id:new UntypedFormControl(0),
    modules_document_id: new UntypedFormControl(0),
    files_id: new UntypedFormControl(''),
  });

  getTemplate() {
    this.api.getTemplateDocument(this.id).subscribe((res) => {
      this.primaryForm.patchValue(res.data);
this.getTemplates();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
      this.modal.dismissAll();
    });
  }
  getModules() {
    this.api.getAllModulesDocument().subscribe((res) => {
      this.modules = res.data;
    }, (e) => {
      this.modules = [];
    });
  }
  getTemplates() {
    this.api.getAllModuleDocument(this.primaryForm.get('modules_document_id')?.value).subscribe((res) => {
      this.templates = res.data;
    }, (e) => {
      this.templates = [];
    });
  }
  update() {
    if(this.primaryForm.get('fhater')?.value=='2' && this.primaryForm.get('template_documents_id')?.value==0){
      this.toast.warning("Falta especificar una plantilla padre valida");
return;
    }
    this.api.updateTemplateDocument(this.primaryForm).subscribe(
      (rs) => {
        this.toast.success('Plantilla modificada correctamente', 'Gestión documentos');
        this.success.emit(true);
        this.primaryForm.reset();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  openModal(mdl: any, size = 'md') {
    this.modal.open(mdl, {
      size: size
    });
  }
  setValueTemplate(file: Files) {
    this.primaryForm.get('files_id').setValue(file.id);
  }
}
