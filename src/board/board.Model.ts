export interface Board{
    id:number;
    title:string;
    content:string;
    status:BoardStatus;
}

export enum BoardStatus{
    PUBLIC='PUBLIC',
    PRIVATE='PRIVATE',
}