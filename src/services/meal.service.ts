import { Injectable } from '@angular/core';
import { MEAL_LIST } from '../dtos/meal-list';
import { Meal } from '../dtos/meal';
import { MealTag } from '../dtos/meal-tag';

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

    // meatMeals doesn't include fish because fish is usually smoked salmon and lasts a while
    getMeatMeals(): Meal[] {
        return this.activeMeals.filter(x => x.tags.includes(MealTag.Beef) || x.tags.includes(MealTag.Chicken) || x.tags.includes(MealTag.Turkey));
    }

    getVegMeals(): Meal[] {
        return this.activeMeals.filter(x => (x.tags.includes(MealTag.Vegetarian) || x.tags.includes(MealTag.LongLife)) && !x.tags.includes(MealTag.NonVegetarian));
    }

    shuffleMeals(array: Array<Meal>): Meal[] {
        let currentIndex = array.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}
