import { Button, Dialog, Flex, Typography } from '@strapi/design-system';
import { WarningCircle } from '@strapi/icons';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
  onToggleDialog: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  bodyText: { id: string; defaultMessage: string };
  title: { id: string; defaultMessage: string };
  rightButtonText?: { id: string; defaultMessage: string };
  variantRightButton?: 'default' | 'tertiary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'success-light' | 'danger-light';
  iconRightButton?: ReactNode;
}

export function ConfirmDialog({
  onToggleDialog,
  onConfirm,
  isOpen,
  bodyText,
  title,
  rightButtonText,
  variantRightButton = 'danger-light',
  iconRightButton,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggleDialog}>
      <Dialog.Content>
        <Dialog.Header>{title.defaultMessage}</Dialog.Header>
        <Dialog.Body>
          <Flex justifyContent="center" direction="column" gap={2}>
            <WarningCircle width="24px" height="24px" fill="danger600" />
            <Typography id="confirm-description" textAlign="center">
              {bodyText.defaultMessage}
            </Typography>
          </Flex>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Cancel>
            <Button variant="tertiary" onClick={onToggleDialog}>
              Cancel
            </Button>
          </Dialog.Cancel>
          <Dialog.Action>
            <Button
              variant={variantRightButton}
              onClick={handleConfirm}
              startIcon={iconRightButton}
            >
              {rightButtonText?.defaultMessage || 'Confirm'}
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
