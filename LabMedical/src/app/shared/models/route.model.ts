import {RolesEnum} from "../enums/roles.enum";

export interface RouteModel {
  icon: string
  url: string
  category: string
  title: string
  roles : RolesEnum[]
}
