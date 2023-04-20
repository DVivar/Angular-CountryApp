import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

private debauncerSubscription?: Subscription;
private debouncer: Subject<string> = new Subject<string>();

@Input()
public placeholder: string = '';

@Input()
public initialValue: string = '';

@Output()
public onValue = new EventEmitter<string>();

@Output()
public onDebaunce = new EventEmitter<string>();

ngOnDestroy(): void {
  this.debauncerSubscription?.unsubscribe();
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.debauncerSubscription = this.debouncer
  .pipe(
    debounceTime(300)
  )
  .subscribe(value => {
    this.onDebaunce.emit(value);
  })
}

emitValue(value: string): void {
  this.onValue.emit(value);
}

onKeyPress(searchTerm: string){
  this.debouncer.next( searchTerm);
}


}
