import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pagination } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly httpClient = inject(HttpClient);

  getListVersion(offset?: number, limit?: number): Observable<Pagination> {
    return this.httpClient.get<Pagination>('version', {
      params: {
        limit: limit ?? '',
        offset: offset ?? '',
      },
    });
  }

  getListGeneration(offset?: number, limit?: number): Observable<Pagination> {
    return this.httpClient.get<Pagination>('generation', {
      params: {
        limit: limit ?? '',
        offset: offset ?? '',
      },
    });
  }
}
