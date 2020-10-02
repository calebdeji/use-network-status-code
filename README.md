# use-network-status

> intercept network and get the status

[![NPM](https://img.shields.io/npm/v/use-network-status.svg)](https://www.npmjs.com/package/use-network-status) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-network-status
```

- It's pretty small in size
- It's build with typescript

## Usage

```tsx
import React, { useState, useEffect } from 'react'

import useNetworkStatus from 'use-network-status'

const moviesEndpoint = 'https://ghibliapi.herokuapp.com/films'

const Example = () => {
  const { networkStatusCode, clearStatus } = useNetworkStatus({
    urls: [moviesEndpoint]
  });

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(moviesEndpoint)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          setData(data)
      });
  , [])

  if( networkStatusCode[moviesEndpoint] === 401 ){
    return <p> You are not authorised </p>
  }

  return <>
    {
      data.map(({ id, description })=>{
        return (
          <div key = {id}> <p> { description } </p> </div>
        )
      })
    }
  </>
}
```

## License

MIT © [calebdeji](https://github.com/calebdeji)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
