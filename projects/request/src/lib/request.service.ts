import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseError } from './types/response-error';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, errorParams?: ResponseError<T>, httpOptions: any = {}): Observable<T> {
    const requestHttpOptions: Object = {...this.httpOptions, ...httpOptions};
    const defaultError = errorParams ? errorParams : RequestService.getDefaultErrorParams();

    return this.http.get<T>(url, requestHttpOptions).pipe(
      catchError(this.handleError(defaultError.serviceName, defaultError.operation, defaultError.result))
    );
  }

  post<D, R>(url: string, data: D, errorParams?: ResponseError<R>, httpOptions: any = {}): Observable<R> {
    const requestHttpOptions: Object = {...this.httpOptions, ...httpOptions};
    const defaultError = errorParams ? errorParams : RequestService.getDefaultErrorParams();

    return this.http.post<R>(url, data, requestHttpOptions).pipe(
      catchError(this.handleError(defaultError.serviceName, defaultError.operation, defaultError.result))
    );
  }

  static getDefaultErrorParams(): ResponseError<null> {
    return {
      operation: 'Requesting data',
      serviceName: 'Request Service',
      result: null
    };
  }

  private handleError<T>(serviceName = '', operation = '', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      const message = (error.error && error.error.message) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: send the error to remote logging infrastructure
      console.error(`${serviceName}: ${operation} failed: ${message}`); // log to console instead

      // Let the app keep running by returning a safe result.
      return throwError(result);
    };
  }
}
