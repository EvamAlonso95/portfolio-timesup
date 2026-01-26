export const TimerComponent = ({ initialSeconds }: { initialSeconds: number }) => {
    return (
        <div className="timer-container">
            <div className={`timer-display ${initialSeconds <= 10 ? 'timer-warning' : ''}`}>
                {Math.floor(initialSeconds / 60)}:{String(initialSeconds % 60).padStart(2, '0')}
            </div>
        </div>
    );
};