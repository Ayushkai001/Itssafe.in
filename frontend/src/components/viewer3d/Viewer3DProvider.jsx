import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Viewer3DContext } from './context';

const ModelViewerModal = lazy(() => import('./ModelViewerModal'));

export default function Viewer3DProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openViewer = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openViewer }), [openViewer]);

  return (
    <Viewer3DContext.Provider value={value}>
      <div inert={open ? '' : undefined}>{children}</div>
      {open && (
        <Suspense fallback={null}>
          <ModelViewerModal open={open} onClose={close} />
        </Suspense>
      )}
    </Viewer3DContext.Provider>
  );
}
