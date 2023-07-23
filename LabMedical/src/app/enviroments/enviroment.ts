// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { RolesEnum } from "../shared/enums/roles.enum";
import { RouteModel } from "../shared/models/route.model";

const URL_PRINCIPAL = 'http://localhost:8080/api';
//User controller endpoints
const URL_POST_LOGIN: string = `${URL_PRINCIPAL}/usuarios/login`
const URL_POST_USER_BY_EMAIL: string = `${URL_PRINCIPAL}/usuarios/`
const URL_POST_RESET_PASSWORD: string = `${URL_PRINCIPAL}/usuarios/resetarsenha`

const URL_POST_LOG: string = `${URL_PRINCIPAL}/logs/cadastrar`;
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
    url: "home/pacient-form",
    category: "Cadastros",
    title: "Cadastro de Paciente",
    roles: [
      RolesEnum.ROLE_DOCTOR,
      RolesEnum.ROLE_ADMIN,
      RolesEnum.ROLE_NURSE
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "home/listagem-paciente-teste",
    category: "Listagem de Pacientes Teste",
    title: "Listagem de Pacientes",
    roles: [
      RolesEnum.ROLE_DOCTOR,
      RolesEnum.ROLE_ADMIN,
      RolesEnum.ROLE_NURSE
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
  ROUTES: ROUTES
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

