// formation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:3001';  // Assurez-vous que ce soit l'URL correcte de votre backend

  constructor(private http: HttpClient) { }

  createFormation(formation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createformation`, formation);
  }

  getFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formations`);
  }

  getFormationbyId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/formation/${id}`);
  }

  updateFormation(id: string, formation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateformation/${id}`, formation);
  }

  deleteFormation(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteformation/${id}`);
  }
}
