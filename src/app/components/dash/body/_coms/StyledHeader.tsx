import {
    Button,
    Card,
    CardHeader,
    Typography
} from "@mui/material";

type StyledHeaderProps = {
    title: string
}

export default function StyledHeader({ title }: StyledHeaderProps) {
    return (
        <CardHeader
            title={
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{ borderRadius: "999px" }} elevation={2}>
                        <Button variant="text">
                            <Typography
                                sx={{
                                    background: (theme) => theme.custom.gradients.button,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {title}
                            </Typography>
                        </Button>
                    </Card>
                </div>
            }
            disableTypography
        />
    )
};