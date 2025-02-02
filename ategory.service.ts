import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.apiUrl);
  }

  createCategory(categoryName: string) {
    return this.http.post(this.apiUrl, { categoryName });
  }

  updateCategory(categoryId: number, categoryName: string) {
    return this.http.put(`${this.apiUrl}/${categoryId}`, { categoryName });
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }

}