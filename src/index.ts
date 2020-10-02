import * as React from 'react';

import interceptNetwork from './interceptNetwork';

declare namespace useNetworkStatusNamespace {
	export type Props = {
		urls: Array<string>;
	};

	export type response = {
		responseURL: string;
		status: number;
	};
}

const convertArrayOfURLsToObject = (urls: Array<string>) => {
	return urls.reduce((accumulator, currentValue) => {
		return { ...accumulator, [currentValue]: undefined };
	}, {});
};

const useNetworkStatus = (props: useNetworkStatusNamespace.Props) => {
	const [networkStatusCode, setNetworkStatusCode] = React.useState(() => {
		return convertArrayOfURLsToObject(props.urls);
	});

	const handleStatusAndUrl = (url: string, statusCode: number) => {
		const isValidURL = props.urls.some((validURL) => {
			const validURLLength = validURL.length;
			return url.substr(0, validURLLength) === validURL;
		});

		if (isValidURL) {
			setNetworkStatusCode((prevValues) => ({
				...prevValues,
				[url]: statusCode
			}));
		}
	};

	const clearStatus = (urls: Array<string> = []) => {
		if (urls.length !== 0) {
			setNetworkStatusCode((prevValues) => {
				const undefinedURLsStatusCode = convertArrayOfURLsToObject(urls);
				return {
					...prevValues,
					...undefinedURLsStatusCode
				};
			});
		} else {
			setNetworkStatusCode(() => {
				return convertArrayOfURLsToObject(props.urls);
			});
		}
	};

	React.useEffect(() => {
		interceptNetwork({
			onFetchResponse: ({ url, status }) => {
				handleStatusAndUrl(url, status);
			},
			onLoad: ({ target }) => {
				const {
					status,
					responseURL
				} = target as useNetworkStatusNamespace.response;
				handleStatusAndUrl(responseURL, status);
			},
			onError: ({ target }, [, responseURL]) => {
				const { status } = target as useNetworkStatusNamespace.response;
				handleStatusAndUrl(responseURL, status);
			},
			onFetchError: (_, args) => {
				handleStatusAndUrl(args[0], 0);
			}
		});
	}, []);

	return { networkStatusCode, clearStatus };
};

export default useNetworkStatus;
