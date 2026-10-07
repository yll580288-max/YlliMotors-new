import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Car = {
  badge: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  cars: Car[] = [
    {
      badge: 'New',
      brand: 'BMW',
      model: '330i',
      year: 2022,
      mileage: '32,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: '$42,900',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85'
    },
    {
      badge: 'Used',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2023,
      mileage: '40,000 km',
      fuel: 'Diesel',
      transmission: 'Automatic',
      price: '$38,500',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85'
    },
    {
      badge: 'New',
      brand: 'Audi',
      model: 'Q5',
      year: 2024,
      mileage: '15,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: '$54,900',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85'
    },
    {
      badge: 'Used',
      brand: 'Toyota',
      model: 'RAV4',
      year: 2023,
      mileage: '27,000 km',
      fuel: 'Hybrid',
      transmission: 'Automatic',
      price: '$29,900',
      image: 'https://images.unsplash.com/photo-1568844293986-8c5b6e4b5f0e?auto=format&fit=crop&w=900&q=85'
    }
  ];

  filteredCars: Car[] = [...this.cars];
  selectedCar: Car | null = null;
  showMobileMenu = false;

  selectedMake = 'All Makes';
  selectedModel = 'All Models';
  selectedYear = 'Any Year';
  selectedPrice = 'Any Price';

  carPrice = 35000;
  downPayment = 5000;
  loanTerm = 60;

  get monthlyPayment(): number {
    const principal = this.carPrice - this.downPayment;
    const annualInterest = 0.059;
    const monthlyInterest = annualInterest / 12;
    const term = Number(this.loanTerm) || 12;

    if (principal <= 0) {
      return 0;
    }

    const payment =
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, term)) /
      (Math.pow(1 + monthlyInterest, term) - 1);

    return payment;
  }

  searchCars(): void {
    this.filteredCars = this.cars.filter((car) => {
      const matchesMake =
        this.selectedMake === 'All Makes' || car.brand === this.selectedMake;

      const matchesModel =
        this.selectedModel === 'All Models' ||
        car.model.toLowerCase().includes(this.selectedModel.toLowerCase()) ||
        car.brand.toLowerCase().includes(this.selectedModel.toLowerCase());

      const matchesYear =
        this.selectedYear === 'Any Year' || car.year === Number(this.selectedYear);

      const matchesPrice = this.matchesPrice(car.price);

      return matchesMake && matchesModel && matchesYear && matchesPrice;
    });
  }

  matchesPrice(price: string): boolean {
    const numericPrice = Number(price.replace(/[$,]/g, ''));

    switch (this.selectedPrice) {
      case 'Under $30,000':
        return numericPrice < 30000;
      case '$30,000 - $50,000':
        return numericPrice >= 30000 && numericPrice <= 50000;
      case '$50,000 - $75,000':
        return numericPrice > 50000 && numericPrice <= 75000;
      case '$75,000+':
        return numericPrice > 75000;
      default:
        return true;
    }
  }

  openCarDetails(car: Car): void {
    this.selectedCar = car;
  }

  closeCarDetails(): void {
    this.selectedCar = null;
  }

  cycleCars(direction: number): void {
    if (this.filteredCars.length <= 1) {
      return;
    }

    if (direction > 0) {
      this.filteredCars = [
        this.filteredCars[this.filteredCars.length - 1],
        ...this.filteredCars.slice(0, -1)
      ];
      return;
    }

    this.filteredCars = [...this.filteredCars.slice(1), this.filteredCars[0]];
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }
}