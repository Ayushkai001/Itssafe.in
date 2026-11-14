import { useCallback, useMemo, useState } from 'react';
import { ContactContext } from './context';
import ContactSheet from './ContactSheet';

/**
 * Owns the "Get in touch" sheet. While it is open, the rest of the page is made
 * inert so keyboard and screen-reader focus stays inside the dialog.
 */
export default function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      <div inert={open}>{children}</div>
      <ContactSheet open={open} onClose={close} />
    </ContactContext.Provider>
  );
}
