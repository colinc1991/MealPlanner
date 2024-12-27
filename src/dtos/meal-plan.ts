import { Meal } from "./meal";

export interface MealPlan {
    dayOfWeek: string;
    meal: Meal;
    isLocked: boolean;
}