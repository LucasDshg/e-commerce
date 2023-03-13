import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-rating[rate]',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  @Input() rate: number = 0;

  stars: string[] = ['bi-star', 'bi-star', 'bi-star', 'bi-star', 'bi-star'];
  constructor() {}

  ngOnInit(): void {
    this._calc();
  }

  private _calc() {
    const splitValue = this.rate.toString().split('.');
    const int = +splitValue[0];
    const decimal = +splitValue[1];

    for (let index = 0; index < int; index++) {
      this.stars[index] = 'bi-star-fill';

      if (index === int - 1 && decimal > 0) {
        this.stars[index + 1] = 'bi-star-half';
      }
    }
  }
}
