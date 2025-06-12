import { useState } from 'react'
import styles from './About.module.css'


const ContactFormSimple = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Formular sendt", formData)
        alert("Tak for din besked!")
        setFormData({ name: '', email: '', message: '' })
    }

    return (
      <div className={styles.FormContent}>
      <p>Har du spørgsmål til vores produkter, brug for hjælp til at finde den rigtige vare så Kontakt os på telefon eller mail.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          
            <h2 className={styles.heading}>Kontakt os</h2>

            <input name="name" type="text" placeholder="Skriv dit navn" value={formData.name} onChange={handleChange} className={styles.input} required />

            <input name="email" type="email" placeholder="Skriv din email" value={formData.email} onChange={handleChange} className={styles.input} required />

            <textarea name="message" type="text" placeholder="Skriv din besked" value={formData.message} onChange={handleChange} className={styles.textarea} required />

            <button type="submit" className={styles.button}>
                Send
            </button>
        </form>
        </div>
    )
}

export default ContactFormSimple
