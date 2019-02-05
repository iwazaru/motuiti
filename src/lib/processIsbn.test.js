import processIsbn from './processIsbn';

describe('processIsbn', () => {
  it('should process a valid ISBN-13', () => {
    const ean = processIsbn('978-2-913039-90-2');
    expect(ean).toBe('9782913039902');
  });

  it('should throw an error for an invalid ISBN', () => {
    const tested = () => processIsbn('978-2-913039-90');
    expect(tested).toThrow('Cet ISBN semble invalide.');
  });
});
