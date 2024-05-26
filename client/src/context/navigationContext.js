import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isNavMenu, setIsNavMenu, ] = useState(true)

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 768) { // Adjust breakpoint as needed
            setIsNavMenu(false);
          } else {
            setIsNavMenu(true);
            setIsOpen(false);
          }
        };
    
        // Call handleResize on initial render
        handleResize();
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

      return (
        <NavigationContext.Provider value={{ isOpen, setIsOpen, handleToggle, isNavMenu  }}>
          {children}
        </NavigationContext.Provider>
      );
}



export function useCustomNav() {
    return useContext(NavigationContext);
}