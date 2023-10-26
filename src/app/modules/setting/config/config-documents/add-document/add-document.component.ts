import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Files } from 'src/app/models/interfaces/Files';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { TemplateDocuments } from 'src/app/models/interfaces/template-documents';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id > 0) {
      this.primaryForm.get('modules_document_id').setValue(this.id);
    }
  }
  ngOnInit(): void {
    this.getModules();
    this.getTemplates();
    if (this.id > 0) {
      this.primaryForm.get('modules_document_id').setValue(this.id);
    }
  }

  modules: any;
  templates:any;

  @Output()
  success = new EventEmitter<TemplateDocuments>();

  @Input()
  id: number;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    number: new UntypedFormControl(0),
    fhater:new UntypedFormControl('1'),
    template_documents_id:new UntypedFormControl(0),
    modules_document_id: new UntypedFormControl(0),
    files_id: new UntypedFormControl(''),
  });

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
  create() {
    if(this.primaryForm.get('fhater')?.value=='2' && this.primaryForm.get('template_documents_id')?.value==0){
      this.toast.warning("Falta especificar una plantilla padre valida");
return;
    }
    this.api.createTemplateDocument(this.primaryForm).subscribe(
      (rs) => {
        this.toast.success('Plantilla creada correctamente', 'Gestión documentos');
        this.success.emit(rs.data as TemplateDocuments);
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
