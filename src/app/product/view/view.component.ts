import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';

export interface ProductItem {
  id?: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  productListId: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  products: any;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit() {
  }

  getNavigation(link: string, id: string) {
      if(id === ''){
          this.router.navigate([link]);
      } else {
          this.router.navigate([link + '/' + id]);
      }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

}
