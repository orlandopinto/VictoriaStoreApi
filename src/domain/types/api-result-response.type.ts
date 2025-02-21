export type ApiResultResponse = {
     status: string;
     hasError: boolean;
     data?: any;
     message: string | null;
     statusCode: number;
     stackTrace: any | null;
}