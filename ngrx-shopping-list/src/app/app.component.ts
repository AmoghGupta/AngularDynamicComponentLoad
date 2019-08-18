import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


import {AlertComponent} from "../app/alert/alert.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  @ViewChild('addPopup', { read: ViewContainerRef }) popUpContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver){}

  ngOnInit(): void{

  }

private showErrorAlert(alertMessage){
  // load factory
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  // get the place where you want to load the dynamic component
  const viewContainerRef = this.popUpContainerRef;
  // create the component dynamically
  const popuRef = viewContainerRef.createComponent(componentFactory);

  // set dynamic component properties
  popuRef.instance.message = alertMessage;

  //// listen to events coming from inside the dynamic component
  this.subscription = popuRef.instance.closePopup.subscribe(()=>{
    this.subscription.unsubscribe();

    // delete dynamic component
    viewContainerRef.clear();
  });

}

  ngOnDestroy(){
    // make sure the subscriptions are deleted to be safe from memory leaks
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
