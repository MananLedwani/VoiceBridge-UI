import { ChangeDetectorRef, Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product.model';
import { Avatar } from "primeng/avatar";
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, Avatar, Dialog, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent{
    data = {};
    options = {};

    data1 = {};
    options1 = {};

    platformId = inject(PLATFORM_ID);

    visible: boolean = false;

    inventoryItems: Product[] = [
        {
          id: '1a2b3c4d-1111-4f7b-8a7c-2f3e5a6b7c8d',
          name: 'Tomato',
          price: 40,
          quantity: 230,
          category: 'Vegetable',
        },
        {
          id: '2b3c4d5e-2222-4a8b-9c8d-3f4e6b7c8d9e',
          name: 'Potato',
          price: 30,
          quantity: 210,
          category: 'Vegetable',
        },
        {
          id: '3c4d5e6f-3333-4b9c-ad9e-4f5e7c8d9e0f',
          name: 'Carrot',
          price: 50,
          quantity: 120,
          category: 'Vegetable',
        },
        {
          id: '4d5e6f7g-4444-4cad-be0f-5f6e8d9e0f1a',
          name: 'Spinach',
          price: 25,
          quantity: 90,
          category: 'Vegetable',
        },
        {
          id: '5e6f7g8h-5555-4dae-cf1a-6f7e9e0f1a2b',
          name: 'Onion',
          price: 35,
          quantity: 39,
          category: 'Vegetable',
        },
        {
          id: '6f7g8h9i-6666-4ebf-d01b-7f8e0f1a2b3c',
          name: 'Apple',
          price: 120,
          quantity: 78,
          category: 'Fruit',
        },
        {
          id: '7g8h9i0j-7777-4fc0-e12c-8f9e1a2b3c4d',
          name: 'Banana',
          price: 60,
          quantity: 88,
          category: 'Fruit',
        },
        {
          id: '8h9i0j1k-8888-40d1-f23d-9f0e2b3c4d5e',
          name: 'Mango',
          price: 150,
          quantity: 72,
          category: 'Fruit',
        },
        {
          id: '9i0j1k2l-9999-41e2-034e-af1e3c4d5e6f',
          name: 'Orange',
          price: 100,
          quantity: 64,
          category: 'Fruit',
        },
        {
          id: '0j1k2l3m-0000-42f3-145f-bf2e4d5e6f7g',
          name: 'Grapes',
          price: 80,
          quantity: 56,
          category: 'Fruit',
        },
        {
          id: '1k2l3m4n-aaaa-4304-2560-cf3e5e6f7g8h',
          name: 'Rice',
          price: 90,
          quantity: 150,
          category: 'Others',
        },
        {
          id: '2l3m4n5o-bbbb-4415-3671-df4e6f7g8h9i',
          name: 'Sugar',
          price: 45,
          quantity: 120,
          category: 'Others',
        },
        {
          id: '3m4n5o6p-cccc-4526-4782-ef5e7g8h9i0j',
          name: 'Wheat Flour',
          price: 55,
          quantity: 120,
          category: 'Others',
        },
        {
          id: '4n5o6p7q-dddd-4637-5893-ff6e8h9i0j1k',
          name: 'Salt',
          price: 20,
          quantity: 120,
          category: 'Others',
        },
        {
          id: '5o6p7q8r-eeee-4748-69a4-0f7e9i0j1k2l',
          name: 'Cooking Oil',
          price: 180,
          quantity: 120,
          category: 'Others',
        },
    ];

    lowInventoryItems: Product[] = [];

    isLow: WritableSignal<boolean> = signal(false);
    warningMessage: WritableSignal<string | null> = signal(null);


    constructor(private cd: ChangeDetectorRef) {}


    ngOnInit(): void {
        this.initChart();

        this.lowInventoryItems = this.inventoryItems.filter((item) => item.quantity < 50);
        if(this.lowInventoryItems.length > 0) {
          this.isLow.set(true);
          this.showWarn();
        }
    }

    showWarn(): void {
    this.warningMessage.set('⚠️ Low stock alert! Some items have less than 50 quantity.');
    setTimeout(() => {
      this.warningMessage.set(null);
    }, 3000);
  }


    openLowStockDialog(): void{
      this.visible = true;
    }

    hideLowStockDialog(): void{
      this.visible = false;
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            this.data = {
                labels: ['Vegetables', 'Fruits', 'Others'],
                datasets: [
                    {
                        data: [540, 325, 702],
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };
            this.data1 = {
                labels: ['Outgoing', 'Incoming'],
                datasets: [
                    {
                        data: [540, 325],
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400')]
                    }
                ]
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            this.options1 = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck()
        }

    }
}
