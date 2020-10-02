import React, { useEffect } from 'react';
import useNetworkStatusCode from 'use-network-status-code';
import axios from 'axios';

const App = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatusCode({
		urls: [
			'https://ghibliapi.herokuapp.com/film',
			'https://ghibliapi.herokuapp.com/filmsd'
		]
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
				await axios.get('https://ghibliapi.herokuapp.com/filmsd');
			} catch (error) {
				console.log('error ');
			}
		}, 4000);
	}, []);

	return <div>See this {JSON.stringify(networkStatusCode)} </div>;
};
export default App;
