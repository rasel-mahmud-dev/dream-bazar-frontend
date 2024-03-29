import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import store, {RootState} from "src/store";

import "./App.scss";
import "./styles/--breakpoint.scss"
import "./styles/shared.scss";


import useToast from "src/hooks/useToast";
import App from "src/App";
import PromptProvider from "components/Prompt/PromptContext";

function MainComponent(props) {
    const [_, ToastContainer] = useToast();

    useEffect(() => {
        const loaderRoot = document.querySelector(".loader-root") as HTMLElement
        if (loaderRoot) {
            loaderRoot.parentNode?.removeChild(loaderRoot)
        }
    }, []);

    return (
        <>
            <ToastContainer />
            {props.children}
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <PromptProvider>
                <MainComponent>
                    <App />
                </MainComponent>
        </PromptProvider>
    </Provider>
);



