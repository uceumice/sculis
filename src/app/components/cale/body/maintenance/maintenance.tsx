// MUI
import {
    Container,
    Typography
} from '@mui/material';

const Maintenance = () => {
    return (
        <Container
            sx={{
                marginY: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%"
            }}
        >
            <Typography
                align="center"
                component="div"
            >
                {"Der Teil kommt noch! 👋"}
            </Typography>
        </Container>
    );
};

export { Maintenance };