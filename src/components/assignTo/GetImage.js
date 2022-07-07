import React, {useEffect, useState} from 'react';
import './GetImage.css';
import axios from "axios";

function GetImage({imageId}) {
    const [image, setImage] = useState([]);


    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await axios.get(`http://localhost:8080/images/${imageId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setImage(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchImage();
    }, []);

    return (
        <>
            {image.image}
        </>
    );
}

export default GetImage;