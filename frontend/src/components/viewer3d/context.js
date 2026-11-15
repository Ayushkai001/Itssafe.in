import { createContext, useContext } from 'react';

export const Viewer3DContext = createContext({
  openViewer: () => {},
});

export const useViewer3D = () => useContext(Viewer3DContext);

