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
const URL_GET_ALL_USERS: string = `${URL_PRINCIPAL}/usuarios/listar`
const URL_POST_REGISTER_USERS: string = `${URL_PRINCIPAL}/usuarios/cadastrar`
const URL_GET_USER_BY_ID: string = `${URL_PRINCIPAL}/usuarios/buscar`
const URL_PUT_UPDATE_USER: string = `${URL_PRINCIPAL}/usuarios/atualizar`
const URL_DEL_USER_BY_ID: string = `${URL_PRINCIPAL}/usuarios/deletar`
//Log controle endpoints
//Pacient controller endpoints
const URL_PATIENTS: string = `${URL_PRINCIPAL}/pacientes`
//Appointments controller endpoints
const URL_APPOINTMENTS: string = `${URL_PRINCIPAL}/consultas`
const URL_PATIENT_APPOINTMENTS: string = `${URL_PRINCIPAL}/consultas?pacientId=`
const URL_POST_APPOINTMENTS: string = `${URL_PRINCIPAL}/consultas/cadastrar`


//Medicine Controller endpoints
const URL_MEDICINES: string = `${URL_PRINCIPAL}/medicamentos`

//Exam controller endpoints
const URL_EXAMS: string = `${URL_PRINCIPAL}/exames`
const URL_EXAMS_UPDATE: string = `${URL_PRINCIPAL}/exames/atualizar`
const URL_EXAMS_REGISTER: string = `${URL_PRINCIPAL}/exames/cadastrar`

const URL_POST_LOG: string = `${URL_PRINCIPAL}/logs/cadastrar`;
const URL_LOGOUT: string = `${URL_PRINCIPAL}/auth/logout`
const URL_LISTAR_LOG: string = `${URL_PRINCIPAL}/logs/listar`


//Config controller endpoints
const URL_SYSTEM_CONFIG: string = `${URL_PRINCIPAL}/config/sistema`

//Stats endpoints
const URL_STATS:string = `${URL_PRINCIPAL}/estatisticas`

//Exercise endpoints
const URL_EXERCISE: string = `${URL_PRINCIPAL}/exercicios`;
const URL_GET_ALL_EXERCISE: string = `${URL_PRINCIPAL}/exercicios`;
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
    url: "prontuario",
    category: "Sistema",
    title: "Prontuário Eletrônico",
    roles: [
      RolesEnum.ROLE_DOCTOR,
      RolesEnum.ROLE_ADMIN,
      RolesEnum.ROLE_NURSE
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "usuarios",
    category: "Sistema",
    title: "Usuarios",
    roles: [
      RolesEnum.ROLE_ADMIN
    ],
    icon: "./assets/images/inicio.png"
  },
  {
    url: "costumizacao",
    category: "Sistema",
    title: "Costumização do sistema",
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
  URL_PATIENTS: URL_PATIENTS,
  URL_APPOINTMENTS: URL_APPOINTMENTS,
  URL_PATIENT_APPOINTMENTS: URL_PATIENT_APPOINTMENTS,
  URL_POST_APPOINTMENTS: URL_POST_APPOINTMENTS,

  URL_MEDICINES: URL_MEDICINES,

  URL_GET_ALL_USERS: URL_GET_ALL_USERS,
  URL_POST_REGISTER_USERS: URL_POST_REGISTER_USERS,
  URL_GET_USER_BY_ID: URL_GET_USER_BY_ID,
  URL_PUT_UPDATE_USER: URL_PUT_UPDATE_USER,
  URL_DEL_USER_BY_ID: URL_DEL_USER_BY_ID,

  URL_EXAMS: URL_EXAMS,
  URL_EXAMS_UPDATE: URL_EXAMS_UPDATE,
  URL_EXAMS_REGISTER: URL_EXAMS_REGISTER,

  URL_LOGOUT: URL_LOGOUT,
  URL_LISTAR_LOG: URL_LISTAR_LOG,
  URL_SYSTEM_CONFIG: URL_SYSTEM_CONFIG,
  URL_STATS: URL_STATS,
  ROUTES: ROUTES,

  URL_EXERCISE: URL_EXERCISE,
  URL_GET_ALL_EXERCISE: URL_GET_ALL_EXERCISE
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
