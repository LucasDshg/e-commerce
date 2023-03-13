import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button[label]',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() label: string = '';

  @Output() onClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
