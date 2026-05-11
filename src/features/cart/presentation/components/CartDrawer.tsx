'use client';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  void onClose;
  return null;
}