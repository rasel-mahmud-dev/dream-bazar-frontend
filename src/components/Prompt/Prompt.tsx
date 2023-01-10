import React, {FC} from 'react';
import Modal from "UI/Modal/Modal";


import "./styles.scss";
import {PromptContextType} from "components/Prompt/PromptContext";
import {Button} from "UI/index";


export interface PromptOption {
    title: string
    deleteBtn?: { label?: string, className?: string, onClick?: (data) => void }
    cancelBtn?: { label?: string, className?: string, onClick?: (data) => void }
}


interface PromptProps {
    state: PromptContextType
    promptOptions: PromptOption
}

const Prompt: FC<PromptProps> = (props) => {

    const {
        state: {isOpen, data, close},
        promptOptions,
    } = props

    function handleAccept() {
        close(true)
        if (promptOptions?.deleteBtn?.onClick) {
            promptOptions?.deleteBtn?.onClick(data)
        }
    }

    function handleCancel() {
        close()
        if (promptOptions?.cancelBtn?.onClick) {
            promptOptions?.cancelBtn?.onClick(data)
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={() => close()} className={`!top-1/4 max-w-sm`} backdropClass="!bg-dark-900/60">
            <div>
                <h3 className="font-semibold text-lg">{promptOptions?.title}</h3>
            </div>

            <div className="flex items-center gap-x-2 mt-4">
                <Button onClick={handleAccept}
                        className={`bg-red-500 ${promptOptions?.deleteBtn?.className}`}>{promptOptions?.deleteBtn && promptOptions?.deleteBtn.label || "DELETE"}</Button>
                <Button onClick={handleCancel}
                        className={`bg-primary-600 ${promptOptions?.cancelBtn?.className}`}>{promptOptions?.cancelBtn && promptOptions?.cancelBtn.label || "CANCEL"} </Button>
            </div>

        </Modal>
    );
};

export default Prompt;