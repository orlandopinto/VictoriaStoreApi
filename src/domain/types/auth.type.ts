export type UserToken = {
     accessToken: string;
     refreshToken: string;
     user: {
          id: string;
          name: string;
          email: string;
     }
}