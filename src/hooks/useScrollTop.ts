import { useEffect } from "react";

function useScrollTop(top?: number) {
    useEffect(() => {
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    }, []);
}

export default useScrollTop;