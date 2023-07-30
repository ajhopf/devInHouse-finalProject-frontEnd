import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {RolesEnum} from "../../../enums/roles.enum";


@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {
  urlFotoPadrao = "data:image/jpeg;base64,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"
  loggedUser: UserModel = {
    name: '',
    photoUrl: '',
    password: '',
    email: '',
  }

  constructor(public authService: AuthenticationService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getUser()
    if (this.loggedUser.photoUrl === '') this.loggedUser.photoUrl = this.urlFotoPadrao
    this.loggedUser.photoUrl
  }

  returnRoleName(role: RolesEnum | undefined): string {
    switch ("" + role) {
      case 'ROLE_ADMIN':
        return 'Administrador';
      case 'ROLE_DOCTOR':
        return 'Médico';
      case 'ROLE_NURSE':
        return 'Enfermeiro'
      case 'ROLE_PATIENT':
        return 'Patiente'
      default:
        return '';
    }
  }

}