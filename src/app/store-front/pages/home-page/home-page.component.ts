
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductoCardComponent } from '@products/components/producto-card/producto-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

// import { ProductoCardComponent } from "../../../products/components/producto-card/producto-card.component";
;

@Component({
  selector: 'app-home-page',
  imports: [ProductoCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // ActivatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.ActivatedRoute.queryParamMap.pipe(
  //     map( params => (params.get('page') ? +params.get('page')! : 1)),
  //     map( (page) => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1,
  //   }
  // )

  productResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader:({request}) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
      });
    }
  })

 }
