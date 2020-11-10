import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NetworkStatus, { baseURLs } from './ComponentTest';

beforeAll(() => {
	jest.spyOn(window, 'fetch');
	//@ts-ignore
	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => ({ success: true }),
		status: 401
	});
});

afterEach(cleanup);

describe('tests for use-network-status', () => {
	it('should set urls status code values to null on initial render', () => {
		const screen = render(<NetworkStatus />);
		const statusCode = screen.getByRole('status');
		expect(statusCode).toBeTruthy();
		expect(JSON.parse(statusCode.textContent || '')).toEqual({
			[baseURLs[0]]: null,
			[baseURLs[1]]: null
		});
	});

	it('should keep track of the status code of an endpoint when a request is made', async () => {
		const screen = render(<NetworkStatus />);

		const fetchButton = screen.getByText(/fetch/i);
		expect(fetchButton).toBeTruthy();

		userEvent.click(fetchButton);
		expect(window.fetch).toHaveBeenCalledTimes(2);

		const statusCode = await waitFor(() => screen.getByRole(/status/i));

		expect(JSON.parse(statusCode.textContent || '')).toEqual({
			[baseURLs[0]]: 401,
			[baseURLs[1]]: 401
		});
	});

	it('should clear all status codes value when clear button is clicked', async () => {
		const screen = render(<NetworkStatus />);
		const fetchButton = screen.getByText(/fetch/i);
		userEvent.click(fetchButton);

		const clearButton = screen.getByText(/clear all/i);
		userEvent.click(clearButton);

		const statusCode = await waitFor(() => screen.getByRole(/status/i));
		expect(JSON.parse(statusCode.textContent || '')).toEqual({
			[baseURLs[0]]: null,
			[baseURLs[1]]: null
		});
	});
});
