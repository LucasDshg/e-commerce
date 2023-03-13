import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-product-image[imgSelected][images]',
  template: `
    <div class="hstack">
      <div
        class="d-flex flex-column overflow-auto hide-scrollbar"
        [style.max-height.rem]="26"
      >
        <img
          [src]="img"
          class="rounded fit-contain p-1 mb-2 cursor-pointer"
          width="60px"
          height="60px"
          alt=""
          (click)="changeImg(img)"
          *ngFor="let img of images"
        />
      </div>
      <img
        [src]="imgSelected"
        class="fit-contain"
        alt=""
        width="360"
        height="360"
      />
    </div>
  `,
})
export class DetailsProductImageComponent {
  @Input() imgSelected!: string;
  @Input() images!: string[];

  constructor() {}

  changeImg = (img: string) => (this.imgSelected = img);
}
