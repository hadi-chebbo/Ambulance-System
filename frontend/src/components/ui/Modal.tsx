import React from 'react';

type ModalProps = {
    isOpen : boolean;
    onClose : () => void;
    children : React.ReactNode;
};

const Modal  = ({ isOpen, onClose, children } : ModalProps) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl">
                { children }
            </div>
        </div>
    );
}

export default Modal;