import { useState } from 'react';
import useNetworkStatusCode from '../src';

const urlEndpoint = '/example-endpoint';

const useNetworkTest = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatusCode({
		urls: [urlEndpoint]
	});
	const [data, setData] = useState({});

	const fetchRequest = async () => {
		const response = await fetch(urlEndpoint);

		const data = await response.json();
		console.log({ data });

		setData(data);
	};

	return { networkStatusCode, clearStatus, fetchRequest, data };
};

export default useNetworkTest;
