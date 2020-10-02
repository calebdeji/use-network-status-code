import useNetworkStatusCode from '../src';
import { renderHook, act } from '@testing-library/react-hooks';
import { Server, Response } from 'miragejs';

// mock timer using jest
jest.useFakeTimers();

describe('useMyHook', () => {
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

	it('returns status code of the endpoints specified', () => {
		new Server({
			routes() {
				this.post(authURL, () => {
					return new Response(
						400,
						{ some: 'header' },
						{ errors: ['name cannot be blank'] }
					);
				});
			}
		});

		const { result } = renderHook(() =>
			useNetworkStatusCode({
				urls: [authURL]
			})
		);

		fetch(authURL);

		expect(result.current.networkStatusCode[authURL]).toBe(400);
	});
});
