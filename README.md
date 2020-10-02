# use-network-status-code

> Hook created to keep track of the status code of all API calls made to some specific urls

[![NPM](https://img.shields.io/npm/v/use-network-status-code.svg)](https://www.npmjs.com/package/use-network-status-code) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

const CheckForNetworkStatusCodeAnd = () => {
	const { networkStatusCode, clearStatus } = useNetworkStatus({
		urls: [authUserEndpoint, authAdminEndpoint]
	});

	if (
		networkStatusCode[authUserEndpoint] === 401 ||
		networkStatusCode[authUserEndpoint] === 401
	)
		return (
			<div>
				<p> Unauthorised </p>
				<button onClick={clearStatus}> Login </button>
			</div>
		);
	else if (
		networkStatusCode[authUserEndpoint] === 0 ||
		networkStatusCode[authUserEndpoint] === 0
	)
		return <p> Seems you are not connected to the internet </p>;

	return <> </>;
};
```

## License

MIT © [calebdeji](https://github.com/calebdeji)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
