import { User } from '../../models/user.interface';

export const user: User = {
    _id: '1',
    name: 'Maicol',
    lastName: 'Tascon',
    phoneNumber: '300333333',
    cellPhone: '300000000',
    email: 'prueba@prueba.com',
    password: '123456',
    active: true,
    role: '',
    perfilImage: '/assets/images/maicol.jpg',
    nickname: 'miketascon',
    authToken: 'qwerty',
    employee: true
};


export const useList: User[] = [
    {
        _id: '1',
        name: 'Maicol',
        lastName: 'Tascon',
        phoneNumber: '300333333',
        cellPhone: '300000000',
        email: 'prueba@prueba.com',
        password: '123456',
        active: true,
        role: '',
        perfilImage: '/assets/images/maicol.jpg',
        nickname: 'miketascon',
        authToken: 'qwerty',
        employee: true
    },
    {
        _id: '2',
        name: 'Jhon',
        lastName: 'Tascon',
        phoneNumber: '300333333',
        cellPhone: '300000000',
        email: 'prueba2@prueba.com',
        password: '123456',
        active: true,
        role: '',
        perfilImage: '/assets/images/maicol.jpg',
        nickname: 'jhon123',
        authToken: 'qwerty',
        employee: true
    },
    {
        _id: '3',
        name: 'Andres',
        lastName: 'Tascon',
        phoneNumber: '300333333',
        cellPhone: '300000000',
        email: 'prueba3@prueba.com',
        password: '123456',
        active: true,
        role: '',
        perfilImage: '/assets/images/maicol.jpg',
        nickname: 'andres123',
        authToken: 'qwerty',
        employee: true
    }
];
