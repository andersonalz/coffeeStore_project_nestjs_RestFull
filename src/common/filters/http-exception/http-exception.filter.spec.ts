import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExeptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
