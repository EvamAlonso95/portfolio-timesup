import timer from '../../assets/sand-clock.png'

export const TimerComponent = ({ seconds }: { seconds: number }) => {

    const warningClass = seconds <= 10 ? 'timer-warning' : '';
    const criticalClass = seconds <= 5 ? 'timer-critical' : '';

    return (
        <div className="timer-container">
            <span className="status-label">Tiempo restante</span>
            <div className={`timer-display ${warningClass} ${criticalClass}`.trim()}>
                <img src={timer} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                <span className="timer-text">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
            </div>
        </div>
    );
};