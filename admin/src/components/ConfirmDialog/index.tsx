import { ConfirmDialog as StrapiConfirmDialog } from '@strapi/strapi/admin';

type ConfirmDialogProps = {
  onToggleDialog: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  bodyText: { id: string; defaultMessage: string };
  title: { id: string; defaultMessage: string };
  rightButtonText?: { id: string; defaultMessage: string };
  variantRightButton?: string;
  iconRightButton?: React.ReactNode;
};

export function ConfirmDialog({ onToggleDialog, onConfirm, ...props }: ConfirmDialogProps) {
  return (
    <StrapiConfirmDialog
      onToggleDialog={(e: any) => {
        if (e?.target?.id === 'confirm-delete') {
          return;
        }
        onToggleDialog();
      }}
      onConfirm={() => {
        onToggleDialog();
        onConfirm();
      }}
      {...props}
    />
  );
}
