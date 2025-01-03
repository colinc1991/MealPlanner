import { Injectable } from '@angular/core';
import { MEAL_LIST } from '../dtos/meal-list';
import { Meal } from '../dtos/meal';

@Injectable({
    providedIn: 'root'
})
export class MealService {
    baseMeals: Meal[] = MEAL_LIST;
    constructor() {

    }

    getMeals(): Meal[] {
        return [...this.baseMeals];
    }
}
