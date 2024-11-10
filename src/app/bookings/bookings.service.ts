import { Injectable } from "@angular/core";
import { Booking } from "./bookings.model";

@Injectable({providedIn: 'root'})
export class BookingService{
    private _bookings: Booking[] = [
        {
          id: 'xys',
          placeId: 'John',
          placeTitle: 'Manhatan',
          guestNumber: 3,
          userId: 'abc',
          placeDescription: "Its awsome!",
        }
    ];

    get bookings(){
        return [...this._bookings];
    }
}