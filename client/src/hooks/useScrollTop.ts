import { useEffect } from "react";

function useScrollTop(top: number = 0) {
    useEffect(() => {
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    }, []);
}

export default useScrollTop;