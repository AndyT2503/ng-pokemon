import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pagination } from "../models";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly httpClient = inject(HttpClient);

  getList(offset?: number, limit?: number): Observable<Pagination> {
    return this.httpClient.get<Pagination>('item', {
      params: {
        limit: limit ?? '',
        offset: offset ?? '',
      },
    });
  }
}
