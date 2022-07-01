import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import English from '../assets/images/english.svg'
import Hindi from '../assets/images/hindi.svg'

const Language = () => {
    const [selectedLang, setSelectedLang] = useState("English")
    const [isVisible, setIsVisible] = useState(false)
    return (
        <>
            {/* <div onClick={() => setIsVisible(isVisible => !isVisible)}>
                {selectedLang === "English" ?
                    <img height="48px" width="48px" src={English} alt="en" /> : <img height="24px" width="48px" src={Hindi} alt="hi" />}
                {selectedLang}
            </div>
            {
                isVisible &&
                <div >
                    {selectedLang === "English" ? "Hindi" : "English"}
                </div>
            } */}
        </>
    )
}

export default Language