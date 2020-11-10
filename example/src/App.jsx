import React, { useEffect, useRef } from 'react';
import useNetworkStatusCode from 'use-network-status-code';
import axios from 'axios';

const fetchResourceWithFetchAPI = (url) => {
	return new Promise(async (resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const baseURLs = [
	'https://ghibliapi.herokuapp.com/film',
	'https://ghibliapi.herokuapp.com/gbedi'
];

const excludingURLs = [
	'https://ghibliapi.herokuapp.com/login',
	'https://ghibliapi.herokuapp.com/film/sd'
];

const App = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatusCode({
		baseURLs,
		excludingURLs
	});

	let { current: id } = useRef(null);

	const clear = () => {
		clearStatus();
	};

	const clearGbediEndpoint = () => {
		clearStatus(baseURLs[1]);
	};

	const reload = () => {
		fetchResourceWithFetchAPI(baseURLs[0]);
		fetchResourceWithFetchAPI(excludingURLs[1]);
		fetchResourceWithFetchAPI(baseURLs[1]);

		id = setTimeout(async () => {
			try {
				await axios.get(excludingURLs[0]);
			} catch (error) {
				console.log('error ');
			}
		}, 4000);
	};

	useEffect(() => {
		reload();
		return () => {
			clearTimeout(id);
		};
	}, []);

	return (
		<>
			<div>See this {JSON.stringify(networkStatusCode)} </div>
			<button onClick={clear}>Clear </button>
			<button onClick={reload}> Reload </button>
			<button onClick={clearGbediEndpoint}>Clear gbedi</button>
		</>
	);
};
export default App;
