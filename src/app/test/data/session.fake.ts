
import { Session } from '../models/session.interface';

export const session: Session = {
    _id: '1',
    idUser: '1',
    sessionDate: '14-12-2022',
    ipSession: '192.162.128.12',
    hourSession: '17:45:02',
};

export const sessionList: Session[] = [
    {
        _id: '2',
        idUser: '3',
        sessionDate: '14-12-2022',
        ipSession: '192.162.128.23',
        hourSession: '19:45:02',
    },
    {
        _id: '2',
        idUser: '3',
        sessionDate: '14-12-2022',
        ipSession: '192.162.128.23',
        hourSession: '19:45:02',
    }
    ,{
        _id: '3',
        idUser: '2',
        sessionDate: '14-12-2022',
        ipSession: '192.162.128.23',
        hourSession: '21:45:02',
    }
];


