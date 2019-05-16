import { IUser } from '../../interfaces/IUser';

export declare type ActionProps = { form: { [key: string]: string }, user?: IUser, req: Express.Request };
export declare type Action = (props: ActionProps) => unknown;
export declare type Handler = (req: Express.Request) => void;
