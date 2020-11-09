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
		return { ...accumulator, [currentValue]: null };
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
			const correspondingBaseURL = props.baseURLs.find((validURL) => {
				return url.substr(0, validURL.length) === validURL;
			}) as string;

			setNetworkStatusCode((prevValues) => ({
				...prevValues,
				[correspondingBaseURL]: statusCode
			}));
		}
	};

	const clearStatus = (url: string | Array<string> = []) => {
		if (Array.isArray(url)) {
			if (url.length !== 0) {
				setNetworkStatusCode((prevValues) => {
					const nullURLsStatusCode = convertArrayOfURLsToObject(url);
					return {
						...prevValues,
						...nullURLsStatusCode
					};
				});
			} else {
				setNetworkStatusCode(() => {
					return convertArrayOfURLsToObject(props.baseURLs);
				});
			}
		} else {
			setNetworkStatusCode((prevValues) => {
				return {
					...prevValues,
					[url]: null
				};
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
