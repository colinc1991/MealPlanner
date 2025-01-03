import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '../../dtos/filter-item';
import { MealTag } from '../../dtos/meal-tag';

@Component({
    selector: 'app-filter-item',
    standalone: true,
    imports: [NgClass],
    templateUrl: './filter-item.component.html',
    styleUrl: './filter-item.component.scss'
})
export class FilterItemComponent {
    @Input() name: MealTag | undefined = undefined;
    @Input() active: boolean = true;
    @Output() activeChangedEvent = new EventEmitter<FilterItem>();

    flipActive() {
        if (!this.name) {
            return;
        }
        this.active = !this.active;
        this.activeChangedEvent.emit({ active: this.active, tag: this.name });
    }
}
