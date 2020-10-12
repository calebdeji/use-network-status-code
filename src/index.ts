import * as React from 'react';

import interceptNetwork from './interceptNetwork';

declare namespace useNetworkStatusCodeNamespace {
	export type Props = {
		baseURLs: Array<string>;
		excludingURLs?: Array<string>;
	};

	export type response = {
		responseURL: string;
		status: number;
	};
}

const convertArrayOfURLsToObject = (
	urls: Array<string>
): { [key: string]: any } => {
	return urls.reduce((accumulator, currentValue) => {
		return { ...accumulator, [currentValue]: undefined };
	}, {});
};

const useNetworkStatusCode = (props: useNetworkStatusCodeNamespace.Props) => {
	const [networkStatusCode, setNetworkStatusCode] = React.useState(() => {
		return convertArrayOfURLsToObject(props.baseURLs);
	});

	const handleStatusAndUrl = (url: string, statusCode: number) => {
		const isValidURL = props.baseURLs.some((validURL) => {
			const validURLLength = validURL.length;
			return (
				url.substr(0, validURLLength) === validURL &&
				!props?.excludingURLs?.includes(url)
			);
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
				return convertArrayOfURLsToObject(props.baseURLs);
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
				} = target as useNetworkStatusCodeNamespace.response;
				handleStatusAndUrl(responseURL, status);
			},
			onError: ({ target }, [, responseURL]) => {
				const { status } = target as useNetworkStatusCodeNamespace.response;
				handleStatusAndUrl(responseURL, status);
			},
			onFetchError: (_, args) => {
				handleStatusAndUrl(args[0], 0);
			}
		});
	}, []);

	return { networkStatusCode, clearStatus };
};

export default useNetworkStatusCode;
