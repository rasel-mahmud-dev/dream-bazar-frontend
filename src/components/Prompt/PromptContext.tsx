import {createContext, FC, ReactNode, useState} from "react";
import Prompt, {PromptOption} from "components/Prompt/Prompt";



export interface PromptContextType{
    isOpen: boolean
    data: any,
    open: <T>(args: T) => void
    close: (args?: boolean)=>void
    setOption: (options?: PromptOption)=> void
}

const initialState: PromptContextType = {} as PromptContextType
export const PromptContext = createContext(initialState)


interface PromptProps {
    children: ReactNode
}



const PromptProvider: FC<PromptProps> = (props) => {

    const [promptOptions, setPromptOptions] = useState<PromptOption>({} as PromptOption)

    const [state,  setState] = useState<PromptContextType>({
        isOpen: false,
        open: openPrompt,
        close: closePrompt,
        data: "",
        setOption: (value?: PromptOption)=> value && setPromptOptions(value)
    })

    function openPrompt<T>(data: T){
        setState((p)=>({...p, isOpen: true, data: data}))
    }

    function closePrompt(){
        setState((p)=>({...p, isOpen: false, data: ""}))
    }

    return (
        <PromptContext.Provider value={state}>
            <>
                <Prompt state={state} promptOptions={promptOptions}/>
                {props.children}
            </>
        </PromptContext.Provider>
    )

}



export default PromptProvider
