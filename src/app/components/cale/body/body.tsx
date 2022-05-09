import { Paper } from "@mui/material";
import { Maintenance } from "./maintenance/maintenance";

const Body = () => {

    return (
        <Paper sx={{ overflowY: "auto", borderRadius: 0, height: "100%" }}>
            <Maintenance />
        </Paper>

    );
};

export { Body };