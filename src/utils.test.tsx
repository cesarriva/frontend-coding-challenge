import { calculateAge } from './utils';
import { vi } from 'vitest';

describe('calculateAge', () => {
  // As discussed during the interview, I took a look at the Vitest way to mock Date.now()
  // and yes, during the interview somehow I missed this.
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should calculate age properly considering day, month and year', () => {
    //arrange
    const birthDate = '2000-03-01';

    const date = new Date(2025, 0, 1); //Setting to a fixed date
    vi.setSystemTime(date);

    //act
    const finalAge = calculateAge(birthDate);

    //arrange
    expect(finalAge).toBe(24); //24
  });
});
