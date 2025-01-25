import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../dtos/meal-plan';
import { Meal } from '../../dtos/meal';
import { MealService } from '../../services/meal.service';
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

        this.meals = this.mealService.getBaseMeals();
    }

    ngOnInit(): void {
        this.shufflePlan();
    }

    shufflePlan() {
        this.meals = this.mealService.getActiveMeals();
        const lockedMeals = this.mealPlans.filter(x => x.isLocked == true).map(x => x.meal.name);

        if (lockedMeals.length == 7) {
            this.mealService.openModal("Can't shuffle meals - they're all locked!")
        }

        if (lockedMeals.length > 0) {
            this.meals = this.meals.filter(x => !lockedMeals.includes(x.name))
        }

        let meatMeals = this.mealService.getMeatMeals(this.meals);
        let vegMeals = this.mealService.getVegMeals(this.meals);

        meatMeals = this.mealService.shuffleMeals(meatMeals);
        vegMeals = this.mealService.shuffleMeals(vegMeals);

        this.setMealPlans(meatMeals, vegMeals);
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

    private setMealPlans(meatMeals: Meal[], vegMeals: Meal[]) {
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
}
