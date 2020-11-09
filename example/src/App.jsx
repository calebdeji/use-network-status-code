import React, { useEffect } from 'react';
import { useRef } from 'react';
import useNetworkStatusCode from 'use-network-status-code';
import axios from 'axios';

const App = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatusCode({
		baseURLs: [
			'https://ghibliapi.herokuapp.com/film',
			'https://ghibliapi.herokuapp.com/gbedi'
		],
		excludingURLs: [
			'https://ghibliapi.herokuapp.com/login',
			'https://ghibliapi.herokuapp.com/film/sd'
		]
	});

	let { current: id } = useRef(null);

	console.log({ networkStatusCode });

	const clear = () => {
		clearStatus();
	};

	const clearGbediEndpoint = () => {
		clearStatus('https://ghibliapi.herokuapp.com/gbedi');
	};

	const reload = () => {
		fetch('https://ghibliapi.herokuapp.com/film')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log({ filmData: data });
			});

		fetch('https://ghibliapi.herokuapp.com/film/sd')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log({ filmSDData: data });
			});

		fetch('https://ghibliapi.herokuapp.com/gbedi')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log({ gbediData: data });
			});

		id = setTimeout(async () => {
			try {
				await axios.get('https://ghibliapi.herokuapp.com/login');
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
