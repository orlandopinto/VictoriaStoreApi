export type UserToken = {
     token: string;
     user: {
          id: string;
          name: string;
          email: string;
     }
}

export type SystemUserToken = {
     token: string;
     user: {
          id: string;
          userName: string;
          email: string;
     }
}

export type SignToken = (payload: Object, duration?: any) => Promise<string | null>