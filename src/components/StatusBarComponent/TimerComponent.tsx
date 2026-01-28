export const TimerComponent = ({ seconds }: { seconds: number }) => {
    return (
        <div className="timer-container">
            <div className={`timer-display ${seconds <= 10 ? 'timer-warning' : ''}`}>
                {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
            </div>
        </div>
    );
};