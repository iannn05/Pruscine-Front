import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent {
  service: AuthService;
  activatedRoute: any;
  constructor(public authService: AuthService){
    this.service = authService;
  }
}
