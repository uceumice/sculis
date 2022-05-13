import { Box, Stack } from "@mui/material";

type TileBaseProps = {
    size: { width: number, height: number }

    children: any
}

const TileBase = (props: TileBaseProps) => {
    return (
        <Box
            sx={{
                height: props.size.height, width: props.size.width,
                display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start",
                backgroundColor: "background.default"
            }}
        >
            {props.children}
        </Box>
    )

}

export { TileBase };