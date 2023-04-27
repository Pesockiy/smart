import { useState, useCallback, useMemo } from "react";

const useToggle = (initial = false) => {
    const [isOpen, setToggleValue] = useState(initial);

    const toggle = useCallback(() => setToggleValue(!isOpen), []);
    return [isOpen, toggle]
};

export default useToggle;