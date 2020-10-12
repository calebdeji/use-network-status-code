import React, { useEffect } from 'react';
import useNetworkStatusCode from 'use-network-status-code';
import axios from 'axios';

const App = () => {
	const { networkStatusCode } = useNetworkStatusCode({
		baseURLs: [
			'https://ghibliapi.herokuapp.com/film',
			'https://ghibliapi.herokuapp.com/filmsd'
		],
		excludingURLs: ['https://ghibliapi.herokuapp.com/login']
	});

	useEffect(() => {
		fetch('https://ghibliapi.herokuapp.com/film')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log({ dataNisin: data });
			});

		const id = setTimeout(async () => {
			try {
				await axios.get('https://ghibliapi.herokuapp.com/login');
			} catch (error) {
				console.log('error ');
			}
		}, 4000);

		return () => {
			clearTimeout(id);
		};
	}, []);

	return <div>See this {JSON.stringify(networkStatusCode)} </div>;
};
export default App;
