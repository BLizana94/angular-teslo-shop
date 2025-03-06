import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductoCardComponent } from '@products/components/producto-card/producto-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductoCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
    )
  )

  productResource = rxResource({
    request: () => ({gender: this.gender(), page: this.paginationService.currentPage() - 1}),
    loader:({request}) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9,
      });
    }
  })
}
