

export const TimerComponent = ({ seconds }: { seconds: number }) => {

    const warningClass = seconds <= 10 ? 'timer-warning' : '';


    return (
        <div className="timer-container">
            <span className="status-label">Tiempo restante</span>
            <div className={`timer-display ${warningClass} `.trim()}>

                <span className="timer-text">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
            </div>
        </div>
    );
};