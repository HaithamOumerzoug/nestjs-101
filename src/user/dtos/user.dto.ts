import { Products } from "@prisma/client"

export class UserDTO {
    id        : number
    createdAt : Date
    updatedAt : Date
    name      : string
    email     : string

    products  : Products[]
}