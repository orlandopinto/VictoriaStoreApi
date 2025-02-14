export type ApiResultResponse = {
     response: {
          status: string;
          hasError: boolean;
          data?: any;
          statusCode: number;
          error?: any;
          errorMessage?: string
     }
}