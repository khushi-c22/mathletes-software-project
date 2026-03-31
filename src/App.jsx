import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header>
        <h1>👁 EyeTracker</h1>
        <p>Real-time eye tracking dashboard</p>
      </header>

      <main>
        {/*feed or canvas will go here */}
        <div className="tracker-view">
          <p>Camera feed / tracking canvas</p>
        </div>

        {/* Stats / controls  */}
        <div className="controls">
          <button>Start Tracking</button>
          <button>Stop</button>
        </div>
      </main>
    </div>
  )
}

export default App