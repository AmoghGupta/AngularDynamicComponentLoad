import {Component, Input, EventEmitter, Output} from "@angular/core";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent{
  message: string;
  closePopup = new Subject<any>();


  constructor(){}

  onClosePopup(){
    this.closePopup.next();
  }
}
