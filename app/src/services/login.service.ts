import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3001';



  constructor(private http: HttpClient
    ,private router:Router
  ) {}

  register(nom: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nom, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
    
  }
  // Fonction pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // Vérifier si l'identifiant de l'employé est présent dans le localStorage
    return !!localStorage.getItem('admin');
  }
  isAuthenticatedClient(): boolean {
    // Vérifier si l'identifiant de l'employé est présent dans le localStorage
    return !!localStorage.getItem('user');
  }

  // Fonction pour déconnecter l'utilisateur
  logout(): void {
    // Supprimer l'identifiant de l'employé du localStorage
    localStorage.removeItem('admin');
    // Rediriger vers la page de connexion
    this.router.navigate(['/']);
  }


}