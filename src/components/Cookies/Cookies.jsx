import { useState, useEffect } from "react"
import styles from "./Cookies.module.css"

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false)

    // tjek om bruger allrede

    useEffect(() => {
        const cookieAccepted = localStorage.getItem("cookieConsent")
        if (!cookieAccepted) {
            setIsVisible(true)
        }
    }, [])

    const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
}



    // når bruger 
    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true")
        setIsVisible(false)
    }

    // hvis bruger 

    if (!isVisible) return null

    return (
        <div className={styles.banner}>
            <p>
                vi bruger cookies for at forbedre din oplevelse.
            </p>
            <button className={styles.accept} onClick={handleAccept}>Accept</button>
            <button className={styles.decline} onClick={handleDecline}>Decline</button>
        </div>
    )
}

export default CookieBanner






