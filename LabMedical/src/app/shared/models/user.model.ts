import {RolesEnum} from "../enums/roles.enum";

export interface UserModel {
  access_token?: string;
  id?: number
  name?: string
  photoUrl?: string
  password?: string
  email?: string
  role?: RolesEnum
  gender?: string
  cpf?: string
  telephone?: string 
}
