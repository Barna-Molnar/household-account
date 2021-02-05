import { useEffect, useState } from "react";

const useCounter = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("useEffect triggered");
        if (count === 10) alert("Counter at 10");
    }, [count]);
    return [count, setCount]
}

export default useCounter