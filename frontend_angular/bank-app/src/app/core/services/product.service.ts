import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>(`${this.apiUrl}`);
  }

  createProduct(product: Product): Observable<{message: string, data: Product}> {
    return this.http.post<{message: string, data: Product}>(`${this.apiUrl}`, product);
  }

  updateProduct(product: Product): Observable<{message: string, data: Product}> {
    return this.http.put<{message: string, data: Product}>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }

  verifyProductId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }
}
