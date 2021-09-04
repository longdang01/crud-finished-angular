import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/posts';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl).pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: number): Observable<Post> {
    console.log(id);

    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Post>(url).pipe(
      catchError(this.errorHandler)
    );
  }
  delete(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Post>(url, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiUrl, post, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  update(post: Post): Observable<any> {
    return this.httpClient.put(this.apiUrl, post, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.errorMessage;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
