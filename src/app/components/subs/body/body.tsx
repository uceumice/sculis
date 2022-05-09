import {
    Container,
    List,
    Paper
} from '@mui/material';

import { useEffect, useState } from 'react';
import { fetchSubstitution } from '../../../apis';
import { Filter } from '../../../apis/types';

import { News } from './news/news';
import { Subs } from './subs/subs';

type BodyProps = {
    date: Date | null
    filters: Filter[]
    source: string | null
    nes: boolean
}

const Body = (props: BodyProps) => {
    const [news, setNews] = useState<string[] | null>(null);
    const [substitution, setSubstitution] = useState<any[] | null>(null);

    useEffect(() => {
        if (props.date && props.source) {
            fetchSubstitution(props.date, props.source, props.filters, props.nes).then(
                (data) => {
                    setNews(data.attrs.news.entries);
                    setSubstitution(data.subst.subst);
                }
            );
        }

    }, [props.date, props.filters, props.source, props.nes]);

    return (
        <Paper sx={{ overflowY: "auto", borderRadius: 0, height: "100%" }}>
            <Container disableGutters>
                <List disablePadding>
                    <News data={news} />
                    <Subs data={substitution} />
                </List>
            </Container>
        </Paper>
    );
};

export { Body };

