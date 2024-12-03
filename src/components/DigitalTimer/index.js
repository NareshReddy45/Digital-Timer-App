import {useState, useEffect} from 'react'
import './index.css'

function DigitalTimer() {
  const [timerLimit, setTimerLimit] = useState(25) // Default timer limit
  const [timeLeft, setTimeLeft] = useState(25 * 60) // Time in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer) // Clean up timer on component unmount
  }, [isRunning, timeLeft])

  const toggleTimer = () => {
    setIsRunning(prev => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(timerLimit * 60)
  }

  const incrementTimer = () => {
    setTimerLimit(prev => prev + 1)
    setTimeLeft(prev => prev + 60)
  }

  const decrementTimer = () => {
    if (timerLimit > 1) {
      setTimerLimit(prev => prev - 1)
      setTimeLeft(prev => prev - 60)
    }
  }

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  return (
    <div className="bg-container">
      <div className="container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="second-container">
          {/* Left Section */}
          <div className="timer-image-container">
            <div className="timer-circle">
              <h1 className="timer">{formatTime()}</h1>
              <p className="status">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="controls">
            <div className="pause-reset-container">
              <div
                className="start-pause-container"
                onClick={toggleTimer}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') toggleTimer()
                }}
              >
                <img
                  src={
                    isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isRunning ? 'pause icon' : 'play icon'}
                />
                <h1>{isRunning ? 'Pause' : 'Start'}</h1>
              </div>

              <div
                className="reset-container"
                onClick={resetTimer}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') resetTimer()
                }}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-image"
                />
                <h1>Reset</h1>
              </div>
            </div>
            <div className="timer-limit-container">
              <p>Set Timer Limit</p>
              <div className="calculation-part">
                <button
                  className="timer-button"
                  onClick={decrementTimer}
                  disabled={isRunning}
                >
                  -
                </button>
                <p>{timerLimit}</p>
                <button
                  className="timer-button"
                  onClick={incrementTimer}
                  disabled={isRunning}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalTimer
