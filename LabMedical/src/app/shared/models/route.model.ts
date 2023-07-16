import {RolesEnum} from "../enums/roles.enum";

export interface RouteModel {
  url: string
  category: string
  title: string
  role : RolesEnum[]
}
