type RequestLike = {
    method?: string;
    body?: unknown;
};
type ResponseLike = {
    status: (statusCode: number) => ResponseLike;
    json: (payload: unknown) => void;
};
export default function handler(req: RequestLike, res: ResponseLike): Promise<void>;
export {};
