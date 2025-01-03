import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../dtos/meal-plan';
import { Meal } from '../../dtos/meal';
import { MealService } from '../../services/meal.service';
import { MealTag } from '../../dtos/meal-tag';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-meal-plan',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './meal-plan.component.html',
    styleUrl: './meal-plan.component.scss'
})
export class MealPlanComponent implements OnInit {
    mealPlans: MealPlan[];
    meals: Meal[];

    private mealService: MealService;

    constructor(mealService: MealService) {
        this.mealPlans = this.initMealPlans();
        this.mealService = mealService;

        this.meals = this.mealService.getMeals();
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
        let meatMeals = this.meals.filter(x => x.tags.includes(MealTag.Beef) || x.tags.includes(MealTag.Chicken) || x.tags.includes(MealTag.Turkey));
        let vegMeals = this.meals.filter(x => (x.tags.includes(MealTag.Vegetarian) || x.tags.includes(MealTag.LongLife)) && !x.tags.includes(MealTag.NonVegetarian));

        if (vegMeals.length < 2 && meatMeals.length < 5) {
            alert('Need at leat 2 veg and 5 meat meals');
            return;
        }

        if (vegMeals.length < 2) {
            alert('Need at least 2 veg meals');
            return;
        }

        if (meatMeals.length < 5) {
            alert('Need at least 5 meat meals');
            return;
        }

        this.shuffle(meatMeals);
        this.shuffle(vegMeals);

        let meatMealIndex = 0;
        let vegMealIndex = 0;
        for (let i = 0; i < this.mealPlans.length; i++) {
            if (this.mealPlans[i].isLocked) {
                continue;
            }
            // first 5 days are meat meals
            if (i < 5) {
                this.mealPlans[i].meal = meatMeals[meatMealIndex]
                meatMealIndex++
            }
            // last two days are veg meals
            else {
                this.mealPlans[i].meal = vegMeals[vegMealIndex]
                vegMealIndex++
            }
        }
    }

    private initMealPlans(): MealPlan[] {
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
