import { TestBed } from '@angular/core/testing';

import { QuizDataFetcherService } from './quiz-data-fetcher.service';

describe('QuizDataFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizDataFetcherService = TestBed.get(QuizDataFetcherService);
    expect(service).toBeTruthy();
  });
});
