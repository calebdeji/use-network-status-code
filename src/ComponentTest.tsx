import React from 'react';

import useNetworkStatusCode from '.';

export const baseURLs = [
	'https://ghibliapi.herokuapp.com/film',
	'https://ghibliapi.herokuapp.com/gbedi'
];
export const excludingURLs = [
	'https://ghibliapi.herokuapp.com/login',
	'https://ghibliapi.herokuapp.com/film/sd'
];

const ComponentTest = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatusCode({
		baseURLs,
		excludingURLs
	});

	const fetchRequest = () => {
		window.fetch(baseURLs[0]);
		window.fetch(baseURLs[1]);
	};

	return (
		<>
			<div role="status"> {JSON.stringify(networkStatusCode)} </div>

			<button onClick={fetchRequest}> fetch </button>
			<button onClick={() => clearStatus()}> clear all </button>
		</>
	);
};

export default ComponentTest;
