import {
    Card,
    CardProps
} from "@mui/material";


export default function StyledCar(props: CardProps) {
    return (
        <Card
            variant="elevation"
            elevation={5}
            sx={{
                borderRadius: "20px",
                marginY: "20px",
            }}
            {...props}
        />
    );
};