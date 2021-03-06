# use-network-status-code

> Hook created to keep track of the status code of all API calls made to some specific urls

  <p>
  <a href="https://www.npmjs.com/package/use-network-status-code"><img src="https://img.shields.io/npm/v/use-network-status-code.svg" alt="npm"></a>
  <a href="https://www.npmjs.com/package/use-network-status-code"><img src="https://img.shields.io/npm/dm/use-network-status-code.svg" alt="downloads/month"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="pullrequest"></a>
  </p>

## Install

```bash
npm install --save use-network-status-code
```

## Concept

You probably want to redirect a user to the login page or even display a dialog that asks your user to login anytime a particular endpoint returns 401 status code (unauthorised). use-network-status-code helps you keep track of the status code returned from the api, with this, you can easily write a component that controls the dialog based on the status code.

## Usage

```tsx
import React, { useState, useEffect } from 'react';

import useNetworkStatus from 'use-network-status-code';

const authUserEndpoint = 'https://api-endpoint.com';
const authAdminEndpoint = 'https://api-admin-endpoint.com';
const loginEndpoint = 'https://api-admin-login-endpoint.com';

const CheckForNetworkStatusCodeAnd = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatus({
		baseURLs: [authUserEndpoint, authAdminEndpoint], // accepts an array of urls through the baseURLs properties,
		excludingURLs: [loginEndpoint] //specifies the endpoint that matches one of the baseURLs but shouldn't be tracked
	});

	if (
		networkStatusCode[authUserEndpoint] === 401 ||
		networkStatusCode[authAdminEndpoint] === 401
	)
		return (
			<div>
				<p> Unauthorised </p>
				<button onClick={clearStatus}> Login </button>
			</div>
		);
	else if (
		networkStatusCode[authUserEndpoint] === 0 ||
		networkStatusCode[authAdminEndpoint] === 0
	)
		return <p> Seems you are not connected to the internet </p>;

	return <> </>;
};
```

## Examples

- [A simple top level component used with the hook](https://codesandbox.io/s/hardcore-hopper-6vnum)

| Return Value      | description                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| networkStatusCode | an object that contains the status code of the urls. The status code of each url can be accessed via networkStatusCode[url] |
| clearStatus       | accepts an array of urls or a url as a parameter. It resets the statusCode of the url(s) passed                             |

## License

MIT © [calebdeji](https://github.com/calebdeji)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
