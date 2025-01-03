import { Meal } from "./meal";
import { MealTag } from "./meal-tag";


export const MEAL_LIST: Meal[] = [
    {
        name: 'Mac n cheese',
        tags: [MealTag.Vegetarian]
    },
    {
        name: 'Burgers',
        tags: [MealTag.Beef, MealTag.NonVegetarian]
    },
    {
        name: 'Nachos',
        tags: [MealTag.Beef, MealTag.NonVegetarian]
    },
    {
        name: 'Chicken burgers',
        tags: [MealTag.Chicken, MealTag.NonVegetarian]
    },
    {
        name: 'Spinach chicken pasta',
        tags: [MealTag.Chicken, MealTag.NonVegetarian]
    },
    {
        name: 'Healthy sundried tomato pasta',
        tags: [MealTag.Chicken, MealTag.NonVegetarian]
    },
    {
        name: 'Oregano halloumi salad',
        tags: [MealTag.Vegetarian]
    },
    {
        name: 'Everything bagel',
        tags: [MealTag.Fish, MealTag.NonVegetarian]
    },
    {
        name: 'Salmon bagels',
        tags: [MealTag.Easy, MealTag.Quick, MealTag.NonVegetarian]
    },
    {
        name: 'Hartwich',
        tags: [MealTag.Turkey, MealTag.NonVegetarian]
    },
    {
        name: 'Ham & cheese rolls',
        tags: [MealTag.LongLife, MealTag.NonVegetarian]
    },
    {
        name: 'Fry up',
        tags: [MealTag.LongLife, MealTag.Pork, MealTag.Easy, MealTag.NonVegetarian]
    },
    {
        name: 'Steak sandwich',
        tags: [MealTag.Beef, MealTag.Easy, MealTag.NonVegetarian]
    },
];