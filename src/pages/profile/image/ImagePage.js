import React, {useState} from 'react';
import axios from "axios";
import './ImagePage.css';
import Popup from "../../../components/popup/PopUp";
import {useHistory, useParams} from "react-router-dom";

function ImagePage() {
    // const [file, setFile] = useState([]);
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploaded, toggleIsUploaded] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    async function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try {
            const result = await axios.post(`http://localhost:8080/userprofiles/${id}/image`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
            console.log(result.data)
            toggleIsUploaded(true);
        } catch (e) {
            console.error(e)
            console.log(e.response.data);
        }
    }

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    return (
        <>
          <div className="body-outer-container">
                <h1>Profiel foto uploaden</h1>
                <section className="image-content-container-row">
                    <form className="image-upload-form" onSubmit={sendImage}>
                        <section className="image-form-container">
                        <label htmlFor="user-image">
                            Kies een afbeelding (JPEG formaat)
                            <input
                                type="file"
                                name="user-image-field"
                                id="user-image"
                                onChange={handleImageChange}/>
                        </label>
                        {previewUrl &&
                        <label className="label-img-upl-preview">
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
              {isUploaded &&
              <Popup >
                  <span className="success-msg-2">
                      <h1>Afbeelding opgeslagen 🥳</h1>
                      <p>Bekijk nu jouw nieuwe profielfoto</p>
                  <button
                      type="button"
                      onClick={() => history.push(`/profiel/${id}`)}
                  > Naar profiel
                  </button></span>
              </Popup>
              }
          </div>
        </>
    );
}

export default ImagePage;