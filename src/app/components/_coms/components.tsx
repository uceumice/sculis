import { Button, IconButton, List, Typography, TypographyProps } from "@mui/material";
import { Theme } from '@mui/material/styles';

import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

export const RowListExtended = styled(List)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
}));

export const CompactButton = styled(Button)(({ theme }) => ({
    paddingLeft: "15px",
    paddingRight: "15px"
}));

type GitHubLogoProps = {
    to: URL | string
}

const GitHubLogo = (props: GitHubLogoProps) => {

    return <IconButton
        onClick={() => window.open(props.to)}
        size="medium"

        sx={{
            borderRadius: "999px",
            fill: (theme: Theme) => theme.palette.mode === 'light' ? theme.palette.primary.main : "white"
        }}

        aria-label="GitHub Page"
    >
        <svg width="24px" height="24px" viewBox="0 0 45 44" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={`
                M22.4773 0.926671C10.4853 0.926671 0.76001 10.6507 0.76001 
                22.6467C0.76001 32.2427 6.98268 40.3827 15.6133 43.2547C16.7 
                43.4547 17.096 42.784 17.096 42.208C17.096 41.692 17.0773 40.3267 
                17.0667 38.5147C11.0253 39.8267 9.75068 35.6027 9.75068 
                35.6027C8.76268 33.0933 7.33869 32.4253 7.33869 32.4253C5.36669 
                31.0787 7.48802 31.1053 7.48802 31.1053C9.66802 31.2587 10.8147 
                33.344 10.8147 33.344C12.752 36.6627 15.8987 35.704 17.136 35.148C17.3334 
                33.7453 17.8947 32.788 18.5147 32.2453C13.692 31.6973 8.62135 29.8333 
                8.62135 21.5107C8.62135 19.14 9.46802 17.2 10.8574 15.6827C10.6334 
                15.1333 9.88802 12.924 11.0707 9.93466C11.0707 9.93466 12.8933 9.35067 
                17.0427 12.1613C18.7747 11.6787 20.6333 11.4387 22.48 11.4293C24.3253 
                11.4387 26.1827 11.6787 27.9173 12.1613C32.064 9.35067 33.884 9.93466 
                33.884 9.93466C35.0693 12.924 34.324 15.1333 34.1013 15.6827C35.4933 
                17.2 36.3333 19.14 36.3333 21.5107C36.3333 29.8547 31.2547 31.6907 
                26.4173 32.228C27.196 32.8987 27.8907 34.224 27.8907 36.2493C27.8907 
                39.1533 27.864 41.496 27.864 42.208C27.864 42.7893 28.256 43.4653 
                29.3574 43.2533C37.9814 40.3747 44.1987 32.24 44.1987 22.6467C44.1987 
                10.6507 34.4733 0.926671 22.4773 0.926671
            `}
            />
        </svg>
    </IconButton>
};

type LoadingTextProps = {
    length: number,
    intervaal?: number,
    typographyProps?: TypographyProps
}

const LoadingText = (props: LoadingTextProps) => {
    const ranText = (): string => {
        const ranInt = (min: string, max: string) => {
            let _min = parseInt(min, 16);
            let _max = parseInt(max, 16);
            return Math.floor(Math.random() * (_max - _min + 1)) + _min;
        };

        let ss = "";
        for (let i = 0; i < props.length; i++) {
            ss += String.fromCodePoint(ranInt("0x0030", "0x0039"));
        }
        return ss;
    };

    const [text, setText] = useState<string>(ranText());

    useEffect(() => {
        let interval = setInterval(() => {
            setText(ranText());
        }, props.intervaal ? props.intervaal : 80);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <Typography fontSize={10} sx={{ opacity: .4 }} {...props.typographyProps}>{text}</Typography>
    )
};

export { LoadingText, GitHubLogo };