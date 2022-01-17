import { URL } from '@env';
const ramdom =  Math.floor(Math.random() * (10000 - 1 )) + 1;

export const url = `${URL}?id=x${ramdom}`;
    