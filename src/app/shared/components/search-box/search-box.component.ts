import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  @ViewChild('txtInput')
  txtInput!: ElementRef<HTMLInputElement>;

  @Input()
  placeholder: string = '';

  @Input()
  initialValue: string = '';

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(350))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
    this.txtInput.nativeElement.value = '';
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
