export interface IUser {
   _id: string
   name: string
   email: string
   password: string
   age?: number
   salt: string
   city?: string
   country?: string
   birthday?: string
   message?: string
   position?: string
   responsibilities?: [string]
   department?: string
   supervisor?: string
   skills?: [string]
   phone_number?: number
   github?: string
}

export interface IUserInputDTO {
   name: string
   email: string
   password: string
   age?: number
   salt?: string
   city?: string
   country?: string
   birthday?: string
   message?: string
   position?: string
   responsibilities?: [string]
   department?: string
   supervisor?: string
   skills?: [string]
   phone_number?: number
   github?: string
}

export type IUserQuery = {
   offset?: string
   limit?: string
   cursor?: string
   page?: string
}
