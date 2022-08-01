import React from 'react';
import {Redirect, Route} from "react-router-dom";
// import './PrivateRoute.css';


//children = alles wat IN het component staat (de pagina waar je naartoe wilt bijv. in de App.js
//...rest is om te zorgen dat je alles kan destructuren in principe, zonder specifiek te benoemen hier
// Voorbeeld hoe in App.js:

//   <PrivateRoute
//      exact path="/products"
//      isAuth={auth}
//   >
//      <ProductOverviewPage/>
//   </PrivateRoute>


function PrivateRoute({ children, isAuth, ...rest }) {
    return (
        <div>
            <Route {...rest} extact path="/products">
                {isAuth === true ? children : <Redirect to="/" />}
            </Route>
        </div>
    );
}

export default PrivateRoute;