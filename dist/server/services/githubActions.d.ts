export interface ErrorResponse {
    status: number;
    statusText: string;
}
export interface SuccessResponse<T = unknown> {
    status: number;
    data: T;
}
export type ServiceResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;
declare function history(id: string, page?: number): Promise<ServiceResponse>;
declare function trigger(id: string): Promise<ServiceResponse>;
declare function triggerAll(): Promise<ServiceResponse[]>;
declare function getLogs(jobId: string, id: string): Promise<string | ErrorResponse>;
declare const _default: {
    history: typeof history;
    trigger: typeof trigger;
    getLogs: typeof getLogs;
    triggerAll: typeof triggerAll;
};
export default _default;
