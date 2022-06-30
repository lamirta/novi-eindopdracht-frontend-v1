import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './GetImage.css';

function GetImage() {
    const [image, setImage] = useState([]);
    const [imageId, setImageId] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    // const { id } = useParams();

    useEffect(() => {
        async function fetchImage() {
            try {
                // const response = await axios.get(`http://localhost:8080/images/${id}`);
                const response = await axios.get(`http://localhost:8080/images/2`);
                setImage(response.data);
                // setImageId(response.data.id);
                console.log(response.data);
                setPreviewUrl(URL.createObjectURL({image}));
                // console.log(response.data.image);
                // console.log(response.data.id);
                // console.log(response.data.type);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchImage();
    }, []);

    return (
        <div className="body-outer-container">
            <h1>Bekijk individuele foto</h1>
            <section className="content-container-row">
                <p>Voorbeeld:</p>
            </section>
            {previewUrl &&
            <section className="content-container-row">
                <img src={previewUrl} alt="preview van pgehaalde afbeelding" className="image-preview"/>
            </section>
            }
            <button
                type="button"
                // disabled={!image}
            >Deze button doet nog niets</button>
        </div>
    );
}

export default GetImage;
