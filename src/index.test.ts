import useNetworkStatus from './';
import { renderHook, act } from '@testing-library/react-hooks';

// mock timer using jest
jest.useFakeTimers();

describe('useNetworkStatus', () => {
    it('keeps track of urls not passed to the hook', () => {
        const { result } = renderHook(() => useNetworkStatus({ urls: ['https:///dhsjs,s'] }));
        expect(result.current.networkStatusCode).toStrictEqual({ 'https:///dhsjs,s': undefined });
    });

    it('delete statusCode of all APIs when clearStatus is executed without parameters', () => {
        const { result } = renderHook(() => useNetworkStatus({ urls: ['https://testing.com'] }));

        act(() => {
            result.current.clearStatus();
        });

        expect(result.current.networkStatusCode).toStrictEqual({ 'https://testing.com': undefined });
    });

    it('delete statusCode of API when clearStatus is executed with the api url', () => {
        const { result } = renderHook(() => useNetworkStatus({ urls: ['https://testing.com'] }));

        act(() => {
            result.current.clearStatus(['https://testing.com']);
        });

        expect(result.current.networkStatusCode).toStrictEqual({ 'https://testing.com': undefined });
    });
});
