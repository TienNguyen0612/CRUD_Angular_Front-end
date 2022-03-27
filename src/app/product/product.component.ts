import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product";
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formProduct!: FormGroup;
  products!: Product[];
  product!: Product;



  constructor(private productService: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      price: [''],
      description: ['']
    });
    this.getAllProducts();
  }

  get id() {
    return this.formProduct.get('id');
  }

  get name() {
    return this.formProduct.get('name');
  }

  get price() {
    return this.formProduct.get('price');
  }

  get description() {
    return this.formProduct.get('description');
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => this.products = data);
    this.formProduct.reset();
    // @ts-ignore
    document.getElementById('submit').innerText = 'Create';
    // @ts-ignore
    document.getElementById('title').innerText = 'Create New Product';
  }

  getProduct(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.products = [];
      this.products.push(data);
    });
  }

  createProduct() {
    const product = {
      id: this.formProduct.value.id,
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      description: this.formProduct.value.description
    };
    this.productService.createProduct(product).subscribe(() => {
      console.log(product)
      if (product.id === null) {
        alert('Create Product Successfully');
      } else {
        alert('Update Product Successfully');
      }
      this.formProduct.reset();
      this.getAllProducts();
    });
  }

  editProduct(id: number) {
    this.productService.getProductById(id).subscribe(data => this.formProduct.patchValue(data));
    // @ts-ignore
    document.getElementById('submit').innerText = 'Update';
    // @ts-ignore
    document.getElementById('title').innerText = 'Update Product';
  }

  deleteProduct(id: number, name: string) {
    if (confirm('Are you sure, you want to delete product: ' + name + '?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Delete Successfully');
        this.getAllProducts();
      });
    }
  }
}
