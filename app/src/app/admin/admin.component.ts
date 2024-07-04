import { Component, OnInit } from '@angular/core';
 // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';
import { AjoutAdminService } from '../../services/ajout-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins: any[] = [];

  constructor(private ajoutAdminService: AjoutAdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.ajoutAdminService.getAdmins().subscribe(
      (admins) => {
        this.admins = admins;
      },
      (error) => {
        console.error('Erreur lors de la récupération des admins :', error);
      }
    );
  }

  onDelete(id: string): void {
    this.ajoutAdminService.deleteAdmin(id).subscribe(
      () => {
        this.loadAdmins(); // Recharger la liste des admins après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'admin :', error);
      }
    );
  }
}