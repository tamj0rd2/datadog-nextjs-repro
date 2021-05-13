import React, { useState } from 'react'

const HomePage: React.FC = () => {
  const [hasError, setHasError] = useState(false)
  if (hasError) throw new Error('Error from render')

  return (
    <main>
      <h1>Hello world!</h1>
      <button onClick={() => { throw new Error(`Error from handler`) }}>
        Click to throw event handler error
      </button>
      <button onClick={() => setHasError(true)}>Click to throw error in component</button>
      <ul>
        {[1, 1, 1, 1].map((num) => <li key={num}>{num}</li>)}
      </ul>
    </main>
  )
}

export default HomePage
