import { useState } from "react";
import { Navi } from "../navi/navi";
import { AppBar } from "./appbar/appbar";
import { Body } from "./body/body";

type ViewMode = 0 | 1 | 2 | 3;

const Cale = () => {
    const [view, setView] = useState<ViewMode>(0);

    return (
        <div style={{ display: "contents" }}>
            <AppBar mode={view} setMode={setView} />
            <Body mode={view} />
        </div>
    );
};

export { Cale };