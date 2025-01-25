import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MealPlanComponent } from "./meal-plan/meal-plan.component";
import { DialogComponent } from "./dialog/dialog.component";
import { MealListComponent } from "./meal-list/meal-list.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, MealPlanComponent, DialogComponent, MealListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {


    constructor() {
    }
}
