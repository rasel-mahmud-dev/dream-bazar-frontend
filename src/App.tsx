import * as React from "react";
import {Suspense, useContext, useEffect, useState} from "react";
import "./App.scss";
import "./styles/shared.scss";
import { RouterProvider} from "react-router-dom";
import {TopProgressBar} from "components/UI";
import router from "src/routes/routes";

function App(props) {

    return (
        <div className="App">
            <div>
                {/*<Toaster position="top-right" toastOptions={{duration: 1800}} containerClassName="mt-16"/>*/}
                <Suspense fallback={<TopProgressBar/>}>
                    <RouterProvider router={router}/>
                </Suspense>
            </div>
		</div>
    );
}



export default App

// https://prestashopdemosite.com/theme/at_premiumo/demo/en/
