import React, { FC, HTMLAttributes, ReactNode } from "react";
import Modal from "UI/Modal/Modal";
import Loader from "UI/Loader/Loader";

interface Props extends HTMLAttributes<HTMLDivElement> {
    onClose?: () => void;
    loading: boolean;
    message: string;
    loadingTitle: string;
    isSuccess: boolean;
}

const ActionModal: FC<Props> = ({ loadingTitle, className = "", loading, message, isSuccess, onClose }) => {
    return (
        <Modal isOpen={loading || !!message} onClose={onClose} className={`${className} !top-1/4 max-w-sm`} backdropClass="!bg-dark-900/60">
            {loading && !message ? (
                <div>
                    <Loader className="flex justify-center" title={loadingTitle} />
                </div>
            ) : (
                !loading && message && <h1 className="mt-2 font-medium text-dark-600 dark:text-dark-20">{message}</h1>
            )}
        </Modal>
    );
};

export default ActionModal;
