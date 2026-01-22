import { useState, useEffect } from 'react';

interface TimerProps {
    initialSeconds: number;
    onTimeUp?: () => void;
}

export const TimerComponent = ({ initialSeconds = 60, onTimeUp }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    onTimeUp?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, onTimeUp]);

    const toggleTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => {
        setTimeLeft(initialSeconds);
        setIsRunning(false);
    };

    return (
        <div className="timer-container">
            <div className={`timer-display ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
            <button onClick={toggleTimer} className="timer-btn">
                {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            <button onClick={resetTimer} className="timer-btn">↺ Reiniciar</button>
        </div>
    );
};
