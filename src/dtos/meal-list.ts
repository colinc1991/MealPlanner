import { Meal } from "./meal";
import { MealTag } from "./meal-tag";


export const MEAL_LIST: Meal[] = [

    {
        name: 'Mac n cheese',
        tags: [MealTag.Vegetarian]
    },
    {
        name: 'Burgers',
        tags: [MealTag.Beef]
    },
    {
        name: 'Nachos',
        tags: [MealTag.Beef]
    },
    {
        name: 'Chicken burgers',
        tags: [MealTag.Chicken]
    },
    {
        name: 'Spinach chicken pasta',
        tags: [MealTag.Chicken]
    },
    {
        name: 'Healthy sundried tomato pasta',
        tags: [MealTag.Chicken]
    },
    {
        name: 'Oregano halloumi salad',
        tags: [MealTag.Vegetarian]
    },
    {
        name: 'Everything bagel',
        tags: [MealTag.Fish]
    },
    {
        name: 'Salmon bagels',
        tags: [MealTag.Easy, MealTag.Quick]
    },
];