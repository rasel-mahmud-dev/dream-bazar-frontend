import * as React from "react";
import {Suspense, useContext, useEffect, useState} from "react";

import { RouterProvider} from "react-router-dom";
import {TopProgressBar} from "components/UI";
import router from "src/routes/routes";
import {currentAuthAction} from "actions/authAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import {setLanguageAction, toggleThemeAction} from "actions/appAction";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(currentAuthAction())
        dispatch(setLanguageAction(""))
        dispatch(toggleThemeAction())

    }, []);

    return (
        <div className="App">
            <div>
                <Suspense fallback={<TopProgressBar/>}>
                    <RouterProvider router={router}/>
                </Suspense>
            </div>
		</div>
    );
}



export default App

// https://prestashopdemosite.com/theme/at_premiumo/demo/en/
