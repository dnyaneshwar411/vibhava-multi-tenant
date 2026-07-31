export interface IAuthInstance { }

export interface IAuth {
  new(): IAuthInstance;
  findByIdWithScopes(id: string): Promise<{
    success: boolean;
    message: string;
    data?: never
  } | {
    success: boolean;
    message?: never
    data: Record<string, any>
  }>;
}