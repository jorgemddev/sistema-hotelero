import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { Reservations } from '../models/interfaces/reservations';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  detailReservation(reservation: Reservations) {
    // Crea un nuevo objeto jsPDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RESERVA N°" + reservation?.id, 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENTE:", 20, 30);
    doc.setFont("helvetica", "normal");
    doc.text(reservation?.client?.name + " " + reservation?.client?.lastname, 50, 30);
    doc.setFont("helvetica", "bold");
    doc.text("EMAIL: ", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text(reservation?.client?.email, 50, 40);
    doc.setFont("helvetica", "bold");
    doc.text("TELEFONO: ", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(reservation?.client?.phone, 50, 50);


    doc.setFont("helvetica", "bold");
    doc.text("HABITACIÓN: ", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(reservation?.rooms?.room_number, 50, 60);

    if (reservation?.check_ing) {
      doc.setFont("helvetica", "bold");
      doc.text("CHECK IN: ", 20, 70);
      doc.setFont("helvetica", "normal");
      doc.text(reservation?.check_ing, 50, 70);
    }else{
      doc.setFont("helvetica", "bold");
      doc.text("INGRESARA: ", 20, 70);
      doc.setFont("helvetica", "normal");
      doc.text(reservation?.start, 50, 70);
    }

    if (reservation?.check_out) {
      doc.setFont("helvetica", "bold");
      doc.text("CHECK OUT: ", 20, 80);
      doc.setFont("helvetica", "normal");
      doc.text(reservation?.check_out, 50, 80);
    }else{
      doc.setFont("helvetica", "bold");
      doc.text("RETIRADA: ", 20, 80);
      doc.setFont("helvetica", "normal");
      doc.text(reservation?.end, 50, 80);
    }
    doc.save("Reservación_" + reservation?.id + ".pdf");
  }
}
