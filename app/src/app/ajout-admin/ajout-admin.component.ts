import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 // Assurez-vous que le chemin est correct
import { Router, ActivatedRoute } from '@angular/router';
import { AjoutAdminService } from '../../services/ajout-admin.service';

@Component({
  selector: 'app-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.css']
})
export class AjoutAdminComponent implements OnInit {
  form!: FormGroup;
  idcourant: any; // Propriété pour stocker l'ID courant


  constructor(
    private fb: FormBuilder, 
    private ajoutAdminService: AjoutAdminService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.ajoutAdminService.getAdmin(this.idcourant).subscribe(
        (admin) => {
          this.initForm(admin); // Initialiser le formulaire avec les données de l'admin
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'admin :', error);
        }
      );
    } else {
      this.initForm(null); // Initialiser un formulaire vide pour la création
    }
  }

  initForm(adminData: any): void {
    if (adminData) {
      this.form = this.fb.group({
        login: [adminData.login, [Validators.required]],
        password: [adminData.password, [Validators.required]]
      });
    } else {
      this.form = this.fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (!!this.idcourant) {
        this.ajoutAdminService.updateAdmin(this.idcourant, formData.login, formData.password).subscribe(
          () => {
            this.router.navigate(['/admin']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'admin :', error);
          }
        );
      } else {
        this.ajoutAdminService.createAdmin(formData.login, formData.password).subscribe(
          () => {
            this.router.navigate(['/admin']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'admin :', error);
          }
        );
      }
    }
  }

  
}