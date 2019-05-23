import { IQRParams } from '../../interfaces/IQRParams';

export declare type ActionProps = { form: { [key: string]: string }, req: Express.Request };
export declare type QRProps = { form: IQRParams, req: Express.Request };
export declare type Action = (props: ActionProps) => unknown;
export declare type Handler = (req: Express.Request) => void;
