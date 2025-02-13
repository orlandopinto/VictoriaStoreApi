export type RoleToken = {
     token: string;
     role: {
          id: string;
          roleName: string;
     }
}

export type SignToken = (payload: Object, duration?: any) => Promise<string | null>