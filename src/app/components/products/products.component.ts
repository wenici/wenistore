import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Products: Product[];

  constructor(public productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProductsList().subscribe((res) => {
      this.Products = res.map((e) => {
        return {
          data: e.payload.doc.id,
          ...(e.payload.doc.data() as Product),
        };
      });
    });
  }

}
