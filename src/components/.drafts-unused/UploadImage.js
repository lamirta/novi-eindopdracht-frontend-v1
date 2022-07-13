// import React, {useState} from 'react';
// import axios from "axios";
// import {useHistory} from "react-router-dom";
//
// function UploadImage({imageId, profileId}) {
//     const [confirmAssign, toggleConfirmAssign] = useState(false);
//     const history = useHistory();
//
// //     Image Page moet een component zijn IN profile page...
//
//     async function assignImgToProfile(e) {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("file", file);
//
//         try {
//             const result = await axios.put(`http://localhost:8080/userprofiles/${profileId}/image`, formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`
//                     },
//                 })
//             console.log(result.status)
//             history.push(`/profiel/${profileId}`);
//         } catch (e) {
//             console.error(e)
//         }
//     }
//
//     function handleClickBtn() {
//         assignImgToProfile();
//     }
//
//     return (
//         <>
//             <div className="body-inner-container-small">
//                 <h1>Afbeelding aan jouw profiel koppelen</h1>
//                 Wil je deze afbeelding als jouw profielfoto instellen?
//                 <section>
//                     <label htmlFor="assign-img-profile">
//                         <input
//                             type="checkbox"
//                             name="assign-img-profile-chkbx"
//                             id="assign-img-profile"
//                             checked={confirmAssign}
//                             onChange={() => toggleConfirmAssign(!confirmAssign)} />
//                     </label>
//                     <p>Ja!</p>
//                 </section>
//                 <button
//                     type="button"
//                     disabled={!confirmAssign}
//                     onClick={handleClickBtn}
//                 >
//                     Instellen
//                 </button>
//             </div>
//         </>
//     );
// }
//
// export default UploadImage;