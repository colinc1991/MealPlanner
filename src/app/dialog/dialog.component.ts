import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [NgClass],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {
    dialogText: string;
    isOpen: boolean = false;
    private mealService: MealService;

    constructor(mealService: MealService) {
        this.dialogText = "";
        this.mealService = mealService;
        this.mealService.modalState$.subscribe((dialogueText) => {

            if (dialogueText == "") {
                this.isOpen = false;
            }
            else {
                this.isOpen = true;
                this.dialogText = dialogueText;
            }
        })
    }
}
