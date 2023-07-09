import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ApiMailerService } from '../api-mailer.service';
import { TemplateEmail } from 'src/app/models/interfaces/template-email';
import { T } from '@fullcalendar/core/internal-common';
import { EmailData } from 'src/app/models/interfaces/email-data';
import { Clients } from 'src/app/models/interfaces/clients';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiMailerService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
   this.form.get('clients_id')?.setValue(this.clients?.id);
  }
  ngOnInit(): void {
    this.getTemplates();
  }
  @Output()
  success = new EventEmitter<boolean>();
  @Input()
  modulesId: number;
  // Se define el nombre del module
  moduleName = "Modulo email";

  @Input()
  data: EmailData;

  @Input()
  clients: Clients;


  templates: TemplateEmail[];
  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    tag: new UntypedFormControl(),
    subject:new UntypedFormControl(),
    content: new UntypedFormControl(''),
    template_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    modules_id: new UntypedFormControl(0)
  });

  send() {
    this.api.send(this.form).subscribe(
      (response) => {
        this.toast.success(response.msg, this.moduleName);
        this.success.emit(true);
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  setHtml() {
    let content = this.templates.find((tmp: TemplateEmail) => tmp?.id === this.form.get('template_id')?.value);
    this.form.get('subject')?.setValue(content?.subject);
    this.form.get('content')?.setValue(content?.template);
    this.replaceDataHtml();
  }
  replaceDataHtml(){
    if (this.data?.modules_id==this.modulesId) {
      let newHtml=this.form.get('content')?.value.replace(/\[(.*?)\]/g, (match, key) => {
        const cleanKey = key.trim();
        return this.data.data[cleanKey] || '';
      });
      this.form.get('content')?.setValue(newHtml);
    }
  }
  getTemplates() {
    this.api.getModuleTemplates(this.modulesId).subscribe(
      (res) => {
        this.templates = res.data as TemplateEmail[];
      },
    );
  }
  openModal(md: any, size = 'md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike', 'text_color'],
  ];
}
