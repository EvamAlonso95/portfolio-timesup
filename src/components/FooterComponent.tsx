const dateNow = new Date().getFullYear();

export const FooterComponent = () => {
    return (
        <>
            <footer className="footer-custom">
                <div className="footer-content">
                    <p>Portfolio Game - Simulación de Time's Up • Desarrollado por Eva Alonso {dateNow}</p>
                </div>
            </footer>
        </>
    )
}
