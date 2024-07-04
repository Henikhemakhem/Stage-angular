import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutAdminService {
  private apiUrl = 'http://localhost:3001'; // Remplacez par l'URL de votre serveur backend

  constructor(private http: HttpClient) { }

  // Créer un nouvel administrateur
  createAdmin(login: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/createadmin`, { login, password });
  }

  // Obtenir tous les administrateurs
  getAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admins`);
  }

  // Obtenir un administrateur par son ID
  getAdmin(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admins/${id}`);
  }

  // Mettre à jour un administrateur
  updateAdmin(id: string, login: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admins/${id}`, { login, password });
  }

  // Supprimer un administrateur
  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admins/${id}`);
  }
}