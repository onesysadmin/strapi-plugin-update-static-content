import { ReactNode } from 'react';
interface ConfirmDialogProps {
    onToggleDialog: () => void;
    onConfirm: () => void;
    isOpen: boolean;
    bodyText: {
        id: string;
        defaultMessage: string;
    };
    title: {
        id: string;
        defaultMessage: string;
    };
    rightButtonText?: {
        id: string;
        defaultMessage: string;
    };
    variantRightButton?: 'default' | 'tertiary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'success-light' | 'danger-light';
    iconRightButton?: ReactNode;
}
export declare function ConfirmDialog({ onToggleDialog, onConfirm, isOpen, bodyText, title, rightButtonText, variantRightButton, iconRightButton, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
