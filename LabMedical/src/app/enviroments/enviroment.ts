// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {RolesEnum} from "../shared/enums/roles.enum";
import {RouteModel} from "../shared/models/route.model";

const URL_PRINCIPAL = 'http://localhost:8080/api';
//User controller endpoints
const URL_POST_LOGIN: string = `${URL_PRINCIPAL}/usuarios/login`
const URL_POST_USER_BY_EMAIL: string = `${URL_PRINCIPAL}/usuarios/`
const URL_POST_RESET_PASSWORD: string = `${URL_PRINCIPAL}/usuarios/resetarsenha`
const URL_GET_ALL_USERS: string = `${URL_PRINCIPAL}/usuarios/listar`
const URL_POST_REGISTER_USERS: string = `${URL_PRINCIPAL}/usuarios/cadastrar`
const URL_GET_USER_BY_ID: string = `${URL_PRINCIPAL}/usuarios/buscar`
const URL_PUT_UPDATE_USER: string = `${URL_PRINCIPAL}/usuarios/atualizar`
const URL_DEL_USER_BY_ID: string = `${URL_PRINCIPAL}/usuarios/deletar`
//Log controle endpoints
const URL_POST_LOG: string = `${URL_PRINCIPAL}/logs/cadastrar`;
const URL_LOGOUT: string = `${URL_PRINCIPAL}/auth/logout`
const URL_LISTAR_LOG: string = `${URL_PRINCIPAL}/logs/listar`

const ROUTES: RouteModel[] = [
  {
    url: "home",
    category: "Geral",
    title: "home",
    roles: [
      RolesEnum.ROLE_NURSE,
      RolesEnum.ROLE_DOCTOR,
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "log/panel",
    category: "Sistema",
    title: "Painel Log",
    roles: [
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "exemplo/router",
    category: "Exemplo Categoria",
    title: "Exemplo Router",
    roles: [
      RolesEnum.ROLE_DOCTOR,
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "exemplo/router2",
    category: "Exemplo Categoria",
    title: "Exemplo Router2",
    roles: [
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "usuarios",
    category: "Usuarios",
    title: "Usuarios",
    roles: [
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  }

]
export const environment = {
  production: false,
  URL_POST_LOGIN: URL_POST_LOGIN,
  URL_POST_USER_BY_EMAIL: URL_POST_USER_BY_EMAIL,
  URL_POST_RESET_PASSWORD: URL_POST_RESET_PASSWORD,
  URL_POST_LOG: URL_POST_LOG,
  URL_GET_ALL_USERS: URL_GET_ALL_USERS,
  URL_POST_REGISTER_USERS: URL_POST_REGISTER_USERS,
  URL_GET_USER_BY_ID: URL_GET_USER_BY_ID,
  URL_PUT_UPDATE_USER: URL_PUT_UPDATE_USER,
  URL_DEL_USER_BY_ID: URL_DEL_USER_BY_ID,
  URL_LOGOUT: URL_LOGOUT,
  URL_LISTAR_LOG: URL_LISTAR_LOG,
  ROUTES: ROUTES
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */