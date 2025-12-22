import React from 'react';
interface Props {
    variant: 'danger' | 'success';
    title: string;
    message: string;
    action?: React.ReactNode;
    closeToastHandler: () => void;
}
export default function ToastMessage({ variant, title, message, action, closeToastHandler, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
