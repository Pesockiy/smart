import { useState, useCallback } from "react";

const useToggle = (initial = false) => {
    const [isOpen, setToggleValue] = useState(initial);

    const toggle = useCallback(() => setToggleValue(prev => !prev), []);
    return [isOpen, toggle];
};

export default useToggle;