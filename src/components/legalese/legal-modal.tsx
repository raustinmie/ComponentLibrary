import { useState, JSX } from "react";
import styles from './legal-modal.module.css';

interface LegalModalProps {
    title: string;
    content: JSX.Element;
}
export default function LegalModal({title, content}: LegalModalProps) {
    const [showModal, setShowModal] = useState(false);
    return (
    <div>
        <button className={styles.legalButton} onClick={()=> setShowModal(true)}>{title}</button>
            {showModal && 
            <div className={styles.modalOverlay} onClick={() => setShowModal(false)} >
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    {content}
                    <button onClick={()=> setShowModal(false)}>Close</button>
                </div>
            </div>
            }
        </div>
    )
}