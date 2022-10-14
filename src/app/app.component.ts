import { Component, VERSION } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  fg;
  filteredExpenses;
  year: string = '2020';
  count = 7;
  constructor() {}

  expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2019, 7, 14),
    },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
    {
      id: 'e5',
      title: 'New Stationary',
      amount: 450,
      date: new Date(2020, 5, 12),
    },
    {
      id: 'e6',
      title: 'Books ',
      amount: 450,
      date: new Date(2020, 5, 12),
    },
  ];
  ngOnInit() {
    this.fg = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      amount: new FormControl(''),
      date: new FormControl(''),
    });
    this.filterDate();
  }
  filterDate() {
    this.filteredExpenses = [];
    for (let item of this.expenses) {
      let datePart = item.date.toDateString().split(' ')[3];
      if (datePart === this.year) {
        this.filteredExpenses.push(item);
      }
    }
  }

  onSubmit() {
    this.fg.value.id = `e${this.count.toString()}`;
    this.fg.value.date = new Date(this.fg.value.date);
    this.count++;
    this.expenses.push(this.fg.value);
    console.log(this.fg.value);
    this.filterDate();
  }
  onDelete(expenseId) {
    let index = this.expenses.findIndex((item) => {
      return item.id == expenseId;
    });
    this.expenses.splice(index, 1);
    this.filterDate();
  }
  OnYearChange() {
    this.filterDate();
  }
}
