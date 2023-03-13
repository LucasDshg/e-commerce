import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IBreadcrumbItems } from './interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <ng-container *ngFor="let item of menuItems">
          <ng-container
            *ngIf="
              item.url === menuItems[menuItems.length - 1].url;
              else elseTemplate
            "
          >
            <li class="breadcrumb-item active" aria-current="page">
              {{ item.label }}
            </li>
          </ng-container>
          <ng-template #elseTemplate>
            <li class="breadcrumb-item">
              <a [href]="item.url">{{ item.label }}</a>
            </li>
          </ng-template>
        </ng-container>
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  menuItems!: IBreadcrumbItems[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems = this._createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private _createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs: { label: string; url: string }[] = [],
  ): IBreadcrumbItems[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[
        BreadcrumbComponent.ROUTE_DATA_BREADCRUMB
      ] as string;

      if (label) breadcrumbs.push({ label, url });

      return this._createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
