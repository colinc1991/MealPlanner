import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterItem } from '../dtos/filter-item';
import { FilterItemComponent } from "./filter-item/filter-item.component";
import { MealPlanComponent } from "./meal-plan/meal-plan.component";
import { Meal } from '../dtos/meal';
import { MealService } from '../services/meal.service';
import { MealTag } from '../dtos/meal-tag';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, FilterItemComponent, MealPlanComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    meals: Meal[];
    filterItems: FilterItem[];

    private mealService: MealService;

    constructor(mealService: MealService) {
        this.filterItems = this.initFilterItems();
        this.mealService = mealService;

        this.meals = this.mealService.getMeals();
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
}
