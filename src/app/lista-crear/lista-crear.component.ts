import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PeliService } from '../services/peli.services';

@Component({
  selector: 'app-lista-crear',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './lista-crear.component.html',
  styleUrl: './lista-crear.component.css'
})
export class ListaCrearComponent implements OnInit{
  
  listaForm!: FormGroup;
  peliculas: any[] = [];

  
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
