import { useEffect, useRef, useState } from "react";

import { useWindowSize } from "../../../hooks";
import { Week } from "./views/2_week/week";


type BodyProps = {
    mode: 0 | 1 | 2 | 3
}

const Body = (props: BodyProps) => {
    const ref = useRef<null | HTMLDivElement>(null);
    const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (ref) {
            setSize({ height: ref.current!.clientHeight, width: ref.current!.clientWidth });
        }
    }, [useWindowSize()])

    return (
        <div style={{ overflow: "hidden", height: "100%", width: "100%" }} ref={ref}>
            {
                props.mode == 1 ? (
                    <Week size={size} />
                ) : null
            }
        </div >
    );
};


export { Body };