'use client';
import { useCallback, useState } from 'react';

export const useDisclosure = (initVal = false) => {
  const [isOpen, setIsOpen] = useState(initVal);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close, onChange: setIsOpen };
};
