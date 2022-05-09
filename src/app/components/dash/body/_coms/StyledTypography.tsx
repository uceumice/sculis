import {
    Typography,
    TypographyProps
} from '@mui/material';

export default function StyledTypography(props: TypographyProps) {
    return (
        <Typography variant="h6"
            sx={{
                background: (theme) => theme.custom.gradients.button,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                width: "fit-content"
            }}
            {...props}
        >
            {props.children}
        </Typography>
    )
}