import { Component, OnInit } from '@angular/core';
import { BookingService } from './bookings.service';
import { Booking } from './bookings.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private bookingsService: BookingService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }

  onCancelBooking(offerId: string, slidingBooking: IonItemSliding){
    slidingBooking.close();
   // this.bookingsService.onCancelBooking(offerId);
  }

}
