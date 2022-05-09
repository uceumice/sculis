import { Navi } from "../navi/navi";

import { AppBar } from "./appbar/appbar";
import { Body } from "./body/body";

type DashProps = {
    themeSwitch: Function
}

const Dash = (props: DashProps) => {
    return (
        <div style={{ display: "contents" }}>
            <AppBar themeSwitch={props.themeSwitch} />
            <Body />
        </div>
    )
};

export { Dash };