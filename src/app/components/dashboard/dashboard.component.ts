import { Component } from '@angular/core';
import { Sales } from '../../models/sales.model';
import { Product } from '../../models/product.model';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  products: Product[] = [];
  sales: Sales[] = [];

  async ngOnInit() {
    try {
      const res = await fetch('dummy-data/products.json');
      this.products = await res.json();
      console.log(this.products);
    } catch (error) {
      console.error('Error loading groceries:', error);
    }

    try {
      const response = await fetch('dummy-data/sales.json');
      const data: Sales[] = await response.json();
      this.sales = data;
      console.log('Sales data:', this.sales);
    } catch (error) {
      console.error('Error loading sales data:', error);
    }
  }
}
