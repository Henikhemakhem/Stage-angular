import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AjoutAdminService } from '../../services/ajout-admin.service';
import { AuthService } from '../../services/AuthService (2)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  adminLogins: Array<{login: string, password: string}> = [];
  user !:any
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private adminService: AjoutAdminService,
    private router: Router,
    private AUTH:AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    // Récupérer les informations de l'administrateur à partir du service
    this.adminService.getAdmins().subscribe(
      admins => {
        this.adminLogins = admins;
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'administrateur :', error);
      }
    );
  }


  sign(): void {
    // Appel du service d'authentification (supposons que AUTH soit votre AuthService)
    this.AUTH.doGoogleLogin().then(() => {
      // Une fois authentifié, obtenir les informations de l'utilisateur
      this.AUTH.getUserClaims().then((u) => {
        this.user = u;
        // Enregistrer les informations de l'utilisateur dans localStorage
        localStorage.setItem("user", this.user.displayName);
        // Rediriger vers la page "/formation"
        this.router.navigate(["/formation"]);
      });
    }).catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la connexion avec Google:', error);
      // Ajoutez ici la gestion des erreurs, comme afficher un message à l'utilisateur
    });
  }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Vérification des identifiants de l'administrateur
      const isAdmin = this.adminLogins.some(admin => admin.login === email && admin.password === password);
      if (isAdmin) {
        localStorage.setItem('admin', email);
        this.router.navigate(['/home1']); // Redirige vers le layout admin
        return; // Termine l'exécution de la méthode
      }

      this.authService.login(email, password).subscribe(
        response => {
          // Gérer la réponse en fonction du succès ou de l'échec
          if (response.message === 'Connexion réussie') {
            this.router.navigate(['/layout']); // Redirige vers la page de succès pour les utilisateurs
          } else {
            this.errorMessage = 'Identifiants incorrects'; // Affiche le message d'erreur
          }
        },
        error => {
          this.errorMessage = 'An error occurred. Please try again.'; // Gère les erreurs HTTP
        }
      );
    }
  }
}
