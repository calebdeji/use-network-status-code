import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import { Server, Response } from 'miragejs';
import useNetworkStatusCode from '../src';
import useNetworkTest from './useNetworkTest';

// mock timer using jest
jest.useFakeTimers();

describe('useMyHook', () => {
	afterEach(cleanup);
	const authURL = '/example-endpoint';
	it('returns statuscode as undefined when no api calls have been made', () => {
		const { result } = renderHook(() =>
			useNetworkStatusCode({
				urls: [authURL]
			})
		);

		expect(result.current.networkStatusCode).toStrictEqual({
			[authURL]: undefined
		});
	});

	it('returns the statusCode of authURL when a call is made', async () => {
		new Server({
			routes() {
				this.get(authURL, function () {
					console.log('Route got');
					return { isEmpty: null };
				});
			}
		});

		const { result, waitForNextUpdate } = renderHook(() => useNetworkTest());

		result.current.fetchRequest();

		// await waitForNextUpdate();

		expect(result.current.data).toStrictEqual({ isEmpty: null });
	});
});
