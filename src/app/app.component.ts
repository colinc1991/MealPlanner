import { Component, OnInit } from '@angular/core';
import { Meal } from '../dtos/meal';
import { MealPlan } from '../dtos/meal-plan';
import { FormsModule } from '@angular/forms';
import { MealTag } from '../dtos/meal-tag';
import { FilterItem } from '../dtos/filter-item';
import { FilterItemComponent } from "./filter-item/filter-item.component";
import { MealService } from '../services/meal.service';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, FilterItemComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    mealPlans: MealPlan[];
    meals: Meal[];
    filterItems: FilterItem[];

    private mealService: MealService;

    constructor(mealService: MealService) {
        this.mealPlans = this.initMealPlans();
        this.filterItems = this.initFilterItems();
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

    handleFilterItemClick($event: FilterItem) {
        this.meals = this.mealService.getMeals();
        const filterItem = this.filterItems.find(x => x.tag == $event.tag);
        if (filterItem) {
            filterItem.active = $event.active;
        }

        const activeFilterTags: string[] = this.filterItems.filter(x => x.active == true).map(x => x.tag.toString());
        const inactiveFilterTags: string[] = this.filterItems.filter(x => x.active == false).map(x => x.tag.toString());
        // Filter logic: Include meals that match at least one active tag, and don't exclude them just because of inactive tags.
        const filteredMeals = this.meals.filter(meal =>
            meal.tags.some(tag => activeFilterTags.includes(tag.toString())) &&
            (!meal.tags.every(tag => inactiveFilterTags.includes(tag.toString())))
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
        const mealTags: MealTag[] = Object.values(MealTag);
        let filterItems: FilterItem[] = [];
        for (let i = 0; i < mealTags.length; i++) {
            const element = mealTags[i];

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
