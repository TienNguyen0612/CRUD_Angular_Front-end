import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { Product } from '../model/product';
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/product');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + '/product/' + id);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + '/product', product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(API_URL + '/product/' + id);
  }
}
