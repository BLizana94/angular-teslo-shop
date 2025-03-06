import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interfaces';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'producto-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './producto-card.component.html',
})
export class ProductoCardComponent {
  product = input.required<Product>();
  imageUrl = computed(() => {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  })
}
