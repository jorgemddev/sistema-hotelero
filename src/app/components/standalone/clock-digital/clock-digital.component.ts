import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-digital',
  templateUrl: './clock-digital.component.html',
  styleUrls: ['./clock-digital.component.css'],
  standalone:true,
})
export class ClockDigitalComponent implements OnInit {
  hour: string;
  minute: string;
  second: string;

  constructor() { }

  ngOnInit() {
    this.updateTime(); // Actualiza el tiempo al iniciar el componente

    setInterval(() => {
      this.updateTime(); // Actualiza el tiempo cada segundo
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    this.hour = this.formatTime(now.getHours());
    this.minute = this.formatTime(now.getMinutes());
    this.second = this.formatTime(now.getSeconds());
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}