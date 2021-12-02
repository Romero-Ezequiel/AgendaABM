import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  private url = 'https://localhost:44343/';
  private api = 'api/agenda/'

  constructor(private http: HttpClient) { }

  getListAgendas(): Observable<any> {
    return this.http.get(this.url + this.api);
  }

  deleteAgenda(id: number): Observable<any> {
    console.log(id)
    return this.http.delete(this.url + this.api +id);
  }

  saveAgenda(agenda: any): Observable<any> {
    return this.http.post(this.url + this.api, agenda);
  }

  updateAgenda(id: number, agenda: any): Observable<any> {
    return this.http.put(this.url + this.api + id, agenda);
  }

}
