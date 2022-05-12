import { useState, useEffect } from "react";
import { fetchSubstitutionInfo } from "../../apis";
import { Filter } from "../../apis/types";
import { useLocalStorageState } from "../../hooks";
import { AppBar } from "./appbar/appbar";
import { Body } from "./body/body";


const Subs = () => {
    const [nes, setNES] = useLocalStorageState<boolean>(false, 'substitution-non-exclusive-sid');
    const [filters, setFilters] = useLocalStorageState<Filter[]>([], 'substitution-filters');

    const [source, setSource] = useLocalStorageState<string | null>(null, 'substitution-source-uuid');
    const [dates, setDates] = useState<Date[] | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(
        () => {
            if (source) {
                fetchSubstitutionInfo(source).then(
                    (data) => {
                        setDate(new Date(data.substitution.latest));
                        setDates(data.substitution.available.map(date => new Date(date)));
                    }
                );
            };
        }, [source]
    );

    return (
        <div style={{ display: "contents" }}>
            <AppBar
                dates={dates}
                date={date}         setDate={setDate}
                filters={filters}   setFilters={setFilters}
                nes={nes}           setNES={setNES}
            />
            <Body date={date} filters={filters} source={source} nes={nes} />
        </div>
    );
};

export { Subs };