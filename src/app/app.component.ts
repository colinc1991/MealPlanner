import { Component, OnInit } from '@angular/core';
import { Meal } from '../dtos/meal';
import { MealPlan } from '../dtos/meal-plan';
import { FormsModule } from '@angular/forms';
import { MEAL_LIST } from '../dtos/meal-list';
import { MealTag } from '../dtos/meal-tag';
import { FilterItem } from '../dtos/filter-item';
import { FilterItemComponent } from "./filter-item/filter-item.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, FilterItemComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'Meal Planner';
    mealPlans: MealPlan[];
    meals: Meal[] = MEAL_LIST;
    meatMeals: Meal[] = [];
    vegMeals: Meal[] = [];
    filterItems: FilterItem[];
    mealTags: MealTag[] = Object.values(MealTag);

    constructor() {
        this.mealPlans = this.initMealPlans();
        this.filterItems = this.initFilterItems();
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
        this.meatMeals = this.meals.filter(x => x.tags.includes(MealTag.Beef) || x.tags.includes(MealTag.Chicken) || x.tags.includes(MealTag.Turkey));
        this.vegMeals = this.meals.filter(x => x.tags.includes(MealTag.Vegetarian) || x.tags.includes(MealTag.LongLife));

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

    handleFilterItemClick($event: FilterItem) {
        const filterItem = this.filterItems.find(x => x.tag == $event.tag);
        if (filterItem) {
            filterItem.active = $event.active;
        }

        const activeFilterTags: string[] = this.filterItems.filter(x => x.active == true).map(x => x.tag.toString());
        const filteredMeals = this.meals.filter(x =>
            x.tags.some(y => activeFilterTags.includes(y.toString()))
        );
        this.meals = filteredMeals;
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

    private initFilterItems(): FilterItem[] {
        let filterItems: FilterItem[] = [];
        for (let i = 0; i < this.mealTags.length; i++) {
            const element = this.mealTags[i];

            filterItems.push({ active: true, tag: element });
        }
        return filterItems;
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
