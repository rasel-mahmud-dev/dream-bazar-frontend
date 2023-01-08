import React, {useContext} from "react";
import {PromptContext} from "components/Prompt/PromptContext";
import {PromptOption} from "components/Prompt/Prompt";


function usePrompt(options?: PromptOption){
    const promptContext = useContext(PromptContext)
    if(promptContext && promptContext?.setOption) {
        promptContext.setOption(options)
    }
    return promptContext
}

export default usePrompt