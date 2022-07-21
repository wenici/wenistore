import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-soin-beaute',
  templateUrl: './top-soin-beaute.component.html',
  styleUrls: ['./top-soin-beaute.component.css']
})
export class TopSoinBeauteComponent implements OnInit {
  products: Product[];
  
  constructor(
    public productService: ProductsService,
    public shopCartService: ShoppingCardService,
    public router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Product),
        };
      });
    });
  }
  goToDetailsProduct(productId?: string): void {
    this.router.navigate(['product-details', productId]);
    console.log(productId);
  }
}
