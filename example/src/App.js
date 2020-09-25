import React from 'react'

import { useMyHook } from 'use-network-status'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
