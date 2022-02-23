import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../services/product.service';
import { from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

interface DropdownData {
  value: string;
  displayName: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  isUpdate = false;

  categories: DropdownData[] = [
    { value: 'a', displayName: 'A'},
    { value: 'b', displayName: 'B'},
    { value: 'c', displayName: 'C'},
  ];

  currencies: DropdownData[] = [
    { value: 'USD', displayName: 'USD'},
    { value: 'INR', displayName: 'INR'}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[a-zA-Z \-\']+')]],
      category: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      currency: ['', [Validators.required]],
      quantity: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
     switchMap((params) => {
       if (params && params.id) {
         this.isUpdate = true;
        return from(this.productService.getProduct(parseInt(params.id, 10)));
       }
       this.isUpdate = false;
       return of(null);
     }),
     tap((data: any) => {
       if (data) {
        this.productForm.patchValue(data);
       }
     })
    ).subscribe();
  }

  backtoList() {
    this.router.navigate(['']);
  }

  async addProduct() {
    await this.productService.addProduct(this.productForm.value);
    await this.router.navigate(['']);
  }

  async updateProduct() {
    await this.productService.updateProduct(parseInt(this.route.snapshot.params.id), this.productForm.value);
    await this.router.navigate(['']);
  }

}
