import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeliService } from '../services/peli.services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from '../services/review.services';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  peliculas: any[] = [];
  filteredPeliculas: any[] = [];
  starsArray: number[] = [1, 2, 3, 4, 5];
  searchQuery: string = '';

  constructor(private fb: FormBuilder, private peliService: PeliService, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      movie: ['', Validators.required],
      rating: [0, Validators.min(1)],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.peliService.getPeliculas().subscribe((data) => {
      this.peliculas = data;
      this.filteredPeliculas = data;
    });
  }

  filterPeliculas(): void {
    this.filteredPeliculas = this.peliculas.filter((pelicula) =>
      pelicula.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  submitReview(): void {
    console.log('Estado del formulario:', this.reviewForm.status);
    console.log('Datos del formulario:', this.reviewForm.value);

    if (this.reviewForm.valid) {
      console.log('Reseña enviada:', this.reviewForm.value);
      this.reviewService.addReview(this.reviewForm.value).subscribe(() => {
        window.location.reload();
      });
    }
  }
}

