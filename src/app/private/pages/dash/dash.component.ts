import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { startOfMonth, endOfMonth, format, addDays, setMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Helps } from 'src/app/libs/helps';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { Icons } from 'src/app/models/interfaces/icons';
import { Router } from '@angular/router';

// Registra el idioma español
registerLocaleData(localeEs);

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class DashComponent implements OnInit {
  constructor(private router:Router){}
  ngOnInit(): void {
    this.router.navigate(['inventario']);
  }

}