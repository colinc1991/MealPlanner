import { Component, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { MealService } from '../../services/meal.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [NgClass],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnDestroy {
    dialogText: string;
    isOpen: boolean = false;
    private mealService: MealService;
    private modalSubscription: Subscription;

    constructor(mealService: MealService) {
        this.dialogText = "";
        this.mealService = mealService;
        this.modalSubscription = this.mealService.modalState$.subscribe((dialogueText) => {

            if (dialogueText == "") {
                this.isOpen = false;
            }
            else {
                this.isOpen = true;
                this.dialogText = dialogueText;
            }
        })
    }

    ngOnDestroy(): void {
        if (this.modalSubscription) {
            this.modalSubscription.unsubscribe();
        }
    }

    closeDialogue() {
        this.mealService.closeModal();
    }
}
