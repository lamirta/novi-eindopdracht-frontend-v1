import React, {useState} from 'react';
import axios from "axios";
import './ImagePage.css';
import {useHistory} from "react-router-dom";

function ImagePage() {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageId, setImageId] = useState(null);
    const history = useHistory();

    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        // Sla het gekozen bestand op in de state
        setFile(uploadedFile);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {
        // Voorkom een refresh op submit
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post('http://localhost:8080/images', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            setImageId(result.data.id);
            console.log(result.data.id)
            history.push('/foto-koppelen');
        } catch (e) {
            console.error(e)
            console.log(e.response.data);
        }
    }

    return (
        <>
          <div className="body-outer-container">
                <h1>Profiel foto uploaden</h1>
                {/*Implementeer element / popup met functie voor het koppelen van image aan UserProfile*/}
                <section className="image-content-container-row">
                    <form className="image-upload-form" onSubmit={sendImage}>
                        <section className="image-form-container">
                        <label htmlFor="user-image">
                            Kies een afbeelding (JPEG formaat)
                            <input type="file" name="user-image-field" id="user-image" onChange={handleImageChange}/>
                        </label>
                        {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
                        {previewUrl &&
                        <label className="label-image-preview">
                            Preview:
                            <img src={previewUrl} alt="Voorbeeld van gekozen afbeelding" className="image-preview"/>
                        </label>
                        }
                        </section>
                        <button
                            type="submit"
                            disabled={!previewUrl}
                        >Uploaden</button>
                    </form>
                </section>

          </div>
        </>
    );
}

export default ImagePage;