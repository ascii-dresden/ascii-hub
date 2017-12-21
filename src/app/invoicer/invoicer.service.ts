import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class InvoicerService {

  private url = 'http://localhost:8000/api/projects';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findByYear(year: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`).pipe(
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('findAll projects', []))
    );
  }

  findByName(year: string, name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/year/${year}/${name}`).pipe(
      tap(() => this.log(`fetched project w/ name=${name}`)),
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
    this.logger.info(`InvoicerService: ${message}`);
  }
}
