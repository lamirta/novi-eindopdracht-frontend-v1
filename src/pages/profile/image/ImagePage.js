import React, {useState} from 'react';
import axios from "axios";
import './ImagePage.css';
import {useParams} from "react-router-dom";
import Popup from "../../../components/popup/PopUp";
import AssignImageToProfile from "../../../components/assignTo/AssignImageToProfile";

function ImagePage() {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageId, setImageId] = useState(null);
    const [isUploaded, toggleIsUploaded] = useState(false);
    // const [showAssignImage, setShowAssignImage] = useState(false);
    const { profileId } = useParams();

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try {
            const result = await axios.post('http://localhost:8080/images', formData,
                {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
            setImageId(result.data.id)
            console.log(result.data.id)
            console.log(result.data)
            toggleIsUploaded(true);
        } catch (e) {
            console.error(e)
            console.log(e.response.data);
        }
    }

    // function assignToProfile() {
    //     setShowAssignImage(!showAssignImage);
    // }

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
                            <input
                                type="file"
                                name="user-image-field"
                                id="user-image"
                                onChange={handleImageChange}/>
                        </label>
                        {previewUrl &&
                        <label className="label-image-preview">
                            Preview:
                            hoi: {profileId}
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
                  <AssignImageToProfile
                      // assignToProfile={assignToProfile}
                      imageId={imageId}
                      profileId={profileId}
                  />
              </Popup>
              }
          </div>
        </>
    );
}

export default ImagePage;