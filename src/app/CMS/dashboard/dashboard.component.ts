import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../Model/product.model';
import { ApiCallService } from '../../service/api-call.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  recentProducts: Product[] = []; // Array to hold recent products

  constructor(private productService: ApiCallService) { }

  ngOnInit(): void {
    this.fetchRecentProducts();
  }

  // Fetch recent products from the backend
  fetchRecentProducts(): void {
    this.productService.getRecentProducts().subscribe({
      next: (products: Product[]) => {
        if (Array.isArray(products)) {
          this.recentProducts = products;
        } else {
          this.recentProducts = [];
        }
      },
      error: (error) => {
        console.error('Error fetching recent products:', error);
      }
    });
  }
  
}
