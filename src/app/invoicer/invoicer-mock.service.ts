import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoicerMockService {

  private url = 'http://localhost:3000/projects';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findByYear(year: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`).pipe(
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('findAll projects', []))
    );
  }

  findByName(year: string, name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/year/${year}/${name}`).map(value => value[0]).pipe(
      tap(() => this.log  (`fetched project w/ name=${name}`)),
      catchError(this.handleError(`find project by name=${name}`, {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`InvoicerMockService: ${message}`);
  }
}
