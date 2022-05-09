import {
    List,
    ListItem,
    Typography
} from '@mui/material';

import { Block } from './block/block';

import { LoadingText } from '../../../_coms/components';

function randomEmoji() {
    const emoji: Array<string> = ["📭", "🤹", "🌝", "🦥", "🐸"];
    return emoji[Math.floor(Math.random() * emoji.length)];
}

type SubsProps = {
    data: any[] | null
}

const Subs = (props: SubsProps) => {
    return (
        <List>
            {props.data ? (
                props.data.length > 0 ? (
                    props.data.map((block, index) =>
                        <ListItem key={index}>
                            <Block
                                class_={block.class_.toString() + ". Stunde"}
                                entries={block.entries}
                            />
                        </ListItem>
                    )
                ) : (
                    <Typography variant="h3" align="center">
                        {randomEmoji()}
                    </Typography>
                )
            ) : (
                <div style={{
                    width: "100%", height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", alignItems: "center",
                }}
                >
                    <ListItem key={1}>
                        <Block
                            class_={<LoadingText length={16} typographyProps={{ fontSize: 12, marginY: "10px", sx: { opacity: .9 } }}></LoadingText>}
                            disabled
                            entries={
                                []
                            }
                        />
                    </ListItem>
                </div>
            )
            }
        </List >
    );
};

export { Subs };