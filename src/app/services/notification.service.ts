import { Injectable, OnInit } from '@angular/core';
import { Reservations } from '../models/interfaces/reservations';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  public notifications: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  sound: Howl;



  constructor() {
    this.loadNotificationsFromStorage();
   }

  ngOnInit(): void {
    this.loadNotificationSound();
  }

  createNotification(reservation: Reservations) {
    const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds
    const currentTime = new Date().getTime();
    const reservationTime = new Date(reservation?.created_at).getTime();
    const timeDifference = currentTime - reservationTime;
    if (timeDifference > fifteenMinutes) {
      const existingNotifications = this.notifications.value;
      const existingNotification = existingNotifications.find(n => n.reservationId === reservation.id);
      if (!existingNotification) {
        const newNotification = {
          reservationId: reservation.id,
          status: 'unread',
          message: 'N° de reserva: '+reservation?.id+', no confirmada'
        };
        existingNotifications.push(newNotification);
        this.notifications.next(existingNotifications); // Emitir el nuevo valor de las notificaciones
        this.playNotificationSound();
      }
    }
    this.saveNotificationsToStorage();
  }
  

  markNotificationAsRead(reservationId: string) {
    const notifications = this.notifications.value;
    const notification = notifications.find(n => n.reservationId === reservationId);
    if (notification) {
      notification.status = 'read';
    }
    this.notifications.next(notifications); // Emitir el nuevo valor de las notificaciones
  }
  

  getNotifications(): Observable<any[]> {
    return this.notifications.asObservable();
  }

  getUnreadNotificationsCount(): Observable<number> {
    return this.notifications.pipe(
      map((notifications) => notifications.filter(n => n.status === 'unread').length)
    );
  }
  private loadNotificationsFromStorage() {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      this.notifications.next(parsedNotifications);
    }
  }

  private saveNotificationsToStorage() {
    const currentNotifications = this.notifications.value;
    localStorage.setItem('notifications', JSON.stringify(currentNotifications));
  }
  loadNotificationSound() {
    this.sound = new Howl({
      src: ['assets/sound/notification.wav'], // Ruta relativa al archivo de sonido en la carpeta "assets"
      volume: 0.5, // Ajusta el volumen según tus necesidades
      autoplay: false, // No se reproduce automáticamente al cargar
      preload: true // Carga el sonido de inmediato
    });
  }
  
  
  playNotificationSound() {
    console.log("LLAMO A SONIDO");
    if (this.sound) {
      console.log("SI EXISTE SONIDO");
      this.sound.play();
    }
  }
  
}
