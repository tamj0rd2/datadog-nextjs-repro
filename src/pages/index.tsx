import React from 'react'

const HomePage: React.FC = () => {
  return (
    <main>
      <h1>Hello world!</h1>
      <button onClick={() => { throw new Error(`Error thrown for testing purposes`) }}>
        Click to throw an error
      </button>
    </main>
  )
}

export default HomePage
