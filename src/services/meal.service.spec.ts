import { TestBed } from '@angular/core/testing';

import { MealService } from '../../src/services/meal.service';

describe('MealService', () => {
    let service: MealService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MealService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
