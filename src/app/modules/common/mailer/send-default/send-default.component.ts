import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TemplateEmail } from 'src/app/models/interfaces/template-email';
import { ApiMailerService } from '../api-mailer.service';
import { ToastrService } from 'ngx-toastr';
import { EmailData } from 'src/app/models/interfaces/email-data';

@Component({
  selector: 'app-send-default',
  templateUrl: './send-default.component.html',
  styleUrls: ['./send-default.component.css']
})
export class SendDefaultComponent implements OnInit, OnChanges {
  constructor(private api: ApiMailerService, private toast: ToastrService) { }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.get('template_id')?.setValue(this.tamplate_id);
    this.form.get('reservations_id')?.setValue(this.reservationsId);
    this.form.get('payments_id')?.setValue(this.paymentsId);
    this.form.get('clients_id')?.setValue(this.clientsId);
    this.form.get('rooms_id')?.setValue(this.roomsId);
  }
  loading: boolean = false;

  @Input()
  tag: string = "Enviar";
  @Input()
  data: EmailData;
  @Input()
  tamplate_id: number;
  @Input()
  paymentsId: number;
  @Input()
  reservationsId: number;
  @Input()
  clientsId: number;
  @Input()
  roomsId: number;


  // Se define el nombre del module
  moduleName = "Modulo email";
  @Output()
  success = new EventEmitter<boolean>();

  templates: TemplateEmail[];
  form = new UntypedFormGroup({
    payments_id: new UntypedFormControl(0),
    reservations_id: new UntypedFormControl(0),
    rooms_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    template_id: new UntypedFormControl(0)
  });

  send() {
    this.loading = true;
    switch (this.tamplate_id) {
      case 2:
        this.paymentLink();
        break;
    }
  }
  paymentLink() {
    this.api.sendPaymentLink(this.form).subscribe(
      (response) => {
        this.loading = false;
        this.toast.success(response.msg, this.moduleName);
        this.success.emit(true);
      },
      (error) => {
        this.loading = false;
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
}
