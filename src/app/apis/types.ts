type EntryData = {
    room: any,
    subject: any,
    group: any,
    roomchange: any,
    status: any,
    notice: any
}

type Filter = {
    sid: string
    gid: string[]
};

export type { EntryData, Filter };