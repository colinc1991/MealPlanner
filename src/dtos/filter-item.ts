import { MealTag } from "./meal-tag";

export interface FilterItem {
    tag: MealTag;
    active: boolean;
}