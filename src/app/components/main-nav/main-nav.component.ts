import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/services/notification.service';
import { ReservationService } from 'src/app/services/reservations.service';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    this.getProfile();
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
}


