export interface IUser {
   _id: string
   name: string
   email: string
   password: string
   salt: string
}

export interface IUserInputDTO {
   name: string
   email: string
   password: string
}

export type IUserQuery = {
   offset?: string
   limit?: string
}
