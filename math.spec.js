import {
    calculate,
    getOperator,
    getData,
    postData
} from './math';

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      text: () => Promise.resolve(''),
      status: 200
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('Math Operations', () => {
    test('get operator returns math operator', () => {
        expect(getOperator('division')).toEqual('/');
        expect(getOperator('multiplication')).toEqual('*');
        expect(getOperator('addition')).toEqual('+');
        expect(getOperator('subtraction')).toEqual('-');
        expect(getOperator('remainder')).toEqual('%');
    });

    test('calculate returns correct value', () => {
        expect(calculate({
            left: '1.10',
            right: '2.20',
            operation: 'addition'
        })).toEqual(3.3);
    });

    test('get api', () => {
        expect(getData()).toMatchObject({});
    });

    test('post api', () => {
        expect(postData()).toMatchObject({});
    });
});