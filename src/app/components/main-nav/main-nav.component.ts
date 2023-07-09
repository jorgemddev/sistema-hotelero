import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthGuard } from 'src/app/models/guard/auth.guard';
import { NotificationService } from 'src/app/services/notification.service';
import { ReservationService } from 'src/app/services/reservations.service';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Payments } from 'src/app/models/interfaces/payments';
import { CashService } from 'src/app/services/cash.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  notifications: any[] = [];
  unreadNotificationsCount: number = 0;


  isMobile: boolean = false;
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService,
    private reservationService: ReservationService,
    private cashService: CashService
  ) {

  }
  totalSales: number = 0;
  sales: Payments[];
  reservationIdSelected: number;
  ngOnInit(): void {
    this.loadReservations();
    this.getProfile();
    this.getPayments();
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile = result.matches;
        }
      });
    // Suscribirse a los cambios de notificaciones y contador
    this.notificationService.notifications.subscribe((notifications) => {
      this.notifications = notifications;
    });

    this.notificationService.getUnreadNotificationsCount().subscribe((count) => {
      this.unreadNotificationsCount = count;
    });

    this.cashService.getNewPayment().subscribe((rs) => {
      this.getPayments();
    });
  }
  profile: Profile = {
    name: '',
    thumbnail: ''
  };
  getProfile() {
    this.api.getProfile().subscribe((response) => {
      var data = response.data;
      this.profile = data as Profile;
    });
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  logout() {
    this.toastr.info('Hasta luego, nos vemos!');
    this.auth.logout();
  }
  markNotificationAsRead(reservationId: string) {
    this.reservationIdSelected = parseInt(reservationId);
    this.notificationService.markNotificationAsRead(reservationId);
    this.notificationService.getUnreadNotificationsCount().subscribe((count) => {
      this.unreadNotificationsCount = count;
    });
  }

  loadReservations() {
    this.reservationService.getReservationsPolling().subscribe(res => {
      // Itera sobre las reservaciones y crea las notificaciones si es necesario
      let reservation: Reservations[] = res.data as Reservations[];
      reservation.forEach(rese => {
        this.notificationService.createNotification(rese);
      });
    });
  }
  getOrderedNotifications(): any[] {
    return this.notifications.sort((a, b) => {
      if (a.status === 'unread' && b.status === 'read') {
        return -1; // a es no leída y b es leída, a debe aparecer antes
      } else if (a.status === 'read' && b.status === 'unread') {
        return 1; // a es leída y b es no leída, b debe aparecer antes
      } else {
        return 0; // a y b tienen el mismo estado, no hay cambio en el orden
      }
    });
  }
  openModal(mdl: any, size:string) {
    this.modal.open(mdl,{size:size});
  }
  getPayments() {
    this.api.getAllPaymentCash().subscribe(
      (response) => {
        this.sales = response.data as Payments[];
        this.calculatePayment();
      }
    );
  }
  calculatePayment() {
    this.totalSales = 0;
    this.sales.forEach((pay: Payments) => {
      if (pay?.payment_id != 1) {
        this.totalSales = Number(this.totalSales) + Number(pay.ammount);
      }

    });
  }
}


