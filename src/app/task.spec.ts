import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task(1, 'Test Task', false, '2025-05-01', 'High')).toBeTruthy();
  });
});
