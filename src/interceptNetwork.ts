type parameters = {
	onFetchResponse: (_: Response) => void;
	onLoad: (_: ProgressEvent<XMLHttpRequestEventTarget> | any) => void;
	onFetchError: (_: TypeError, args: Array<string>) => void;
	onError: (
		_: ProgressEvent<XMLHttpRequestEventTarget> | any,
		args: Array<string>
	) => void;
};

const interceptNetworkRequests = (ee: parameters) => {
	const open = XMLHttpRequest.prototype.open;
	const send = XMLHttpRequest.prototype.send;

	const isRegularXHR = open.toString().indexOf('native code') !== -1;

	// don't hijack if already hijacked - this will mess up with frameworks like Angular with zones
	// we work if we load first there which we can.
	if (isRegularXHR) {
		XMLHttpRequest.prototype.open = function (...args: any) {
			this.addEventListener('load', function (data) {
				ee.onLoad(data);
			});

			this.addEventListener('error', function (data) {
				ee.onError(data, args);
			});

			return open.apply(this, args);
		};

		XMLHttpRequest.prototype.send = function (...args: any) {
			return send.apply(this, args);
		};
	}

	const fetch = window.fetch || '';
	// don't hijack twice, if fetch is built with XHR no need to decorate, if already hijacked
	// then this is dangerous and we opt out
	const isFetchNative = fetch.toString().indexOf('native code') !== -1;
	if (isFetchNative) {
		window.fetch = function (...args: any) {
			const p = fetch.apply(this, args);
			p.then(ee.onFetchResponse, function (error) {
				ee.onFetchError(error, args);
			});
			return p;
		};
	}
	return ee;
};

export default interceptNetworkRequests;
