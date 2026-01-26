import { createContext, useContext, useState } from 'react';

const RibbonContext = createContext();

export function RibbonProvider({ children }) {
    // This state holds the actual JSX content that the page wants to show
    const [ribbonContent, setRibbonContent] = useState(null);
    const [isRibbonOpen, setIsRibbonOpen] = useState(false);

    // Helper functions for components to use
    const openRibbon = (content) => {
        setRibbonContent(content);
        setIsRibbonOpen(true);
    };

    const closeRibbon = () => {
        setIsRibbonOpen(false);
        setRibbonContent(null);
    };

    return (
        <RibbonContext.Provider value={{ isRibbonOpen, ribbonContent, openRibbon, closeRibbon }}>
            {children}
        </RibbonContext.Provider>
    );
}

export const useRibbon = () => useContext(RibbonContext);