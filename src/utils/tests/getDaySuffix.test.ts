import { getDaySuffix } from '../getDaySuffix';

describe('getDaySuffix', () => {
  it('returns as expected', () => {
    const firstResult = getDaySuffix('1');
    expect(firstResult).toEqual('st');
    const secondResult = getDaySuffix('2');
    expect(secondResult).toEqual('nd');
    const thirdResult = getDaySuffix('23');
    expect(thirdResult).toEqual('rd');
    const fourthResult = getDaySuffix('14');
    expect(fourthResult).toEqual('th');
    const fifthResult = getDaySuffix('invalid number');
    expect(fifthResult).toEqual('th');
  });
});
