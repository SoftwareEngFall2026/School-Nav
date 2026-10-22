import { useState } from 'react'
import { schoolLocations } from './data/schoolLocations'
import { findWrittenRoute, resolveRoomId } from './data/writtenRoutes'
import './App.css'

type Location = { landmark: string; room: string }

function getLocationName(location: Location) {
  const id = location.landmark || resolveRoomId(location.room)
  return schoolLocations.find((landmark) => landmark.id === id)?.displayName
    || location.room.trim()
}

function LocationField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: Location
  onChange: (location: Location) => void
}) {
  return (
    <fieldset className="field">
      <legend>{label}</legend>
      <label htmlFor={`${id}-landmark`}>Choose a landmark</label>
      <select
        id={`${id}-landmark`}
        value={value.landmark}
        onChange={(event) => onChange({ landmark: event.target.value, room: '' })}
      >
        <option value="">Select a landmark</option>
        {schoolLocations.filter((landmark) => !landmark.isWaypoint).map((landmark) => (
          <option key={landmark.id} value={landmark.id}>{landmark.displayName}</option>
        ))}
      </select>
      <span className="location-divider">or</span>
      <label htmlFor={`${id}-room`}>Enter a specific room</label>
      <input
        id={`${id}-room`}
        type="text"
        placeholder="e.g. W-302 or O-309"
        value={value.room}
        onChange={(event) => onChange({ landmark: '', room: event.target.value })}
        aria-describedby={`${id}-hint`}
      />
      <p className="location-hint" id={`${id}-hint`}>
        Choose a landmark or type a room number.
      </p>
    </fieldset>
  )
}

function App() {
  const [startingPoint, setStartingPoint] = useState<Location>({ landmark: '', room: '' })
  const [destination, setDestination] = useState<Location>({ landmark: '', room: '' })
  const [submitted, setSubmitted] = useState(false)
  const from = getLocationName(startingPoint)
  const to = getLocationName(destination)
  const route = findWrittenRoute(
    startingPoint.landmark || resolveRoomId(startingPoint.room) || '',
    destination.landmark || resolveRoomId(destination.room) || '',
  )

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
          Choose a landmark or enter a room number for each location
          to get clear, written directions.
        </p>
      </section>

      <section className="navigation-panel" aria-labelledby="panel-title">
        <h2 id="panel-title">Plan your journey</h2>
        <p className="route-hint">
          First route available: W-301 → W-302, floor 3.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (from && to) setSubmitted(true)
          }}
        >
          <LocationField
            id="starting-point"
            label="Where are you starting?"
            value={startingPoint}
            onChange={(location) => {
              setStartingPoint(location)
              setSubmitted(false)
            }}
          />
          <LocationField
            id="destination"
            label="Where are you going?"
            value={destination}
            onChange={(location) => {
              setDestination(location)
              setSubmitted(false)
            }}
          />

          <button
            className="directions-button"
            type="submit"
            disabled={!from || !to}
          >
            Get Directions
          </button>
        </form>

        {submitted && (
          <div className="journey-summary" role="status">
            <h3>{route ? 'Your directions' : 'Route unavailable'}</h3>
            <p><strong>From:</strong> {from}</p>
            <p><strong>To:</strong> {to}</p>
            {route ? (
              <ol className="direction-steps">
                {route.connections.map((connection) => (
                  <li key={`${connection.from}-${connection.to}`}>{connection.direction}</li>
                ))}
              </ol>
            ) : (
              <p>
                Directions are not available for this route yet. Try W-301 → W-302.
              </p>
            )}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>School Nav prototype · First route: W-301 → W-302</p>
      </footer>
    </main>
  )
}

export default App
