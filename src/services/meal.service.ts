import { Injectable } from '@angular/core';
import { MEAL_LIST } from '../dtos/meal-list';
import { Meal } from '../dtos/meal';

@Injectable({
    providedIn: 'root'
})
export class MealService {
    private baseMeals: Meal[] = MEAL_LIST;
    private activeMeals: Meal[] = MEAL_LIST;
    constructor() {

    }

    getBaseMeals(): Meal[] {
        return [...this.baseMeals];
    }

    setActiveMeals(meals: Meal[]): void {
        this.activeMeals = meals;
    }

    getActiveMeals(): Meal[] {
        return this.activeMeals;
    }
}
