import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
    const [isConfirmOpen, setIsOpen] = useState(false);
    const [isImgViewerOpen, setIsImgViewerOpen] = useState(false);


    const handleConfirmOpen = () => {
        setIsOpen(true);
    }
    const handleConfirmClose = () => {
        setIsOpen(false);
    }

    const handleImgViewerOpen = () => {
      setIsImgViewerOpen(true);
  }
  const handleImgViewerClose = () => {
      setIsImgViewerOpen(false);
  }

      return (
        <ConfirmContext.Provider value={{ isConfirmOpen, handleConfirmOpen, handleConfirmClose, isImgViewerOpen, setIsImgViewerOpen, handleImgViewerOpen, handleImgViewerClose  }}>
          {children}
        </ConfirmContext.Provider>
      );
}



export function useConfirm() {
    return useContext(ConfirmContext);
}