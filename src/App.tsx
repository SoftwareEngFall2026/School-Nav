import { useState } from 'react'
import './App.css'

function App() {
  const [startingPoint, setStartingPoint] = useState('')
  const [destination, setDestination] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="homepage">
      <header className="site-header">
        <a className="app-name" href="/">School Nav</a>
        <span className="prototype-label">Prototype</span>
      </header>

      <section className="intro">
        <p className="eyebrow">Find your way around</p>
        <h1>Where do you need to go?</h1>
        <p className="description">
          Choose where you are and search for your destination
          to get clear, written directions.
        </p>
      </section>

      <section className="navigation-panel" aria-labelledby="panel-title">
        <h2 id="panel-title">Plan your journey</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="field">
            <label htmlFor="starting-point">Where are you starting?</label>

            <select
              id="starting-point"
              value={startingPoint}
              onChange={(event) => {
                setStartingPoint(event.target.value)
                setSubmitted(false)
              }}
              required
            >
              <option value="">Choose a starting point</option>
              <option value="Sample Entrance">Sample Entrance</option>
              <option value="Sample Library">Sample Library</option>
              <option value="Sample Room A">Sample Room A</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="destination">Where are you going?</label>

            <input
              id="destination"
              type="search"
              placeholder="Enter a room number or location"
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value)
                setSubmitted(false)
              }}
              required
            />
          </div>

          <button
            className="directions-button"
            type="submit"
            disabled={!startingPoint || !destination.trim()}
          >
            Get Directions
          </button>
        </form>

        {submitted && (
          <div className="journey-summary" role="status">
            <h3>Journey selected</h3>
            <p><strong>From:</strong> {startingPoint}</p>
            <p><strong>To:</strong> {destination.trim()}</p>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>Proof of Concept 1 · Fictional sample locations</p>
      </footer>
    </main>
  )
}

export default App