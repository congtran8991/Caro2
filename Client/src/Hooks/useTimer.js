import { useState} from "react"
const useTimer = (startTime) => {
    const [time, setTime] = useState(startTime)
    const [intervalID, setIntervalID] = useState(null)
    const hasTimerEnded = time <= 0
    const isTimerRunning = intervalID != null

    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            const invalid = setIntervalID(setInterval(() => {
                setTime( t => {
                    if (t-1>1) {
                        return t - 1
                    }
                    clearInterval(invalid)
                    return 0
                })
            }, 1000))
        }
    }

    return {
        time,
        startTimer
    }
}

export default useTimer