import { Component, OnInit } from '@angular/core';
import { Meal } from '../dtos/meal';
import { MealPlan } from '../dtos/meal-plan';
import { FormsModule } from '@angular/forms';
import { MEAL_LIST } from '../dtos/meal-list';
import { MealTag } from '../dtos/meal-tag';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'MealPlanner';
    mealPlans: MealPlan[];
    meals: Meal[] = MEAL_LIST;
    meatMeals: Meal[] = [];
    vegMeals: Meal[] = [];

    constructor() {
        this.mealPlans = this.initMealPlans();
    }

    ngOnInit(): void {
        this.shufflePlan();
    }

    shufflePlan() {
        const lockedMeals = this.mealPlans.filter(x => x.isLocked == true).map(x => x.meal.name);
        if (lockedMeals.length > 0) {
            this.meals = this.meals.filter(x => !lockedMeals.includes(x.name))
        }

        // meatMeals doesn't include fish because fish is usually smoked salmon and lasts a while
        this.meatMeals = this.meals.filter(x => x.tags.includes(MealTag.Beef) || x.tags.includes(MealTag.Chicken));
        this.vegMeals = this.meals.filter(x => x.tags.includes(MealTag.Vegetarian));

        this.shuffle(this.meatMeals);
        this.shuffle(this.vegMeals);

        let meatMealIndex = 0;
        let vegMealIndex = 0;
        for (let i = 0; i < this.mealPlans.length; i++) {
            if (this.mealPlans[i].isLocked) {
                continue;
            }
            // first 5 days are meat meals
            if (i < 5) {
                this.mealPlans[i].meal = this.meatMeals[meatMealIndex]
                meatMealIndex++
            }
            // last two days are veg meals
            else {
                this.mealPlans[i].meal = this.vegMeals[vegMealIndex]
                vegMealIndex++
            }
        }
    }

    initMealPlans(): MealPlan[] {
        return [
            { dayOfWeek: 'Friday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Saturday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Sunday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Monday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Tuesday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Wednesday', meal: { name: '', tags: [] }, isLocked: false },
            { dayOfWeek: 'Thursday', meal: { name: '', tags: [] }, isLocked: false },
        ]
    }

    private shuffle(array: Array<any>) {
        let currentIndex = array.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}
