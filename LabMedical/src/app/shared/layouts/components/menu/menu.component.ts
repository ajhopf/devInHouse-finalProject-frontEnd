import {Component, OnInit} from '@angular/core';
import {RouteModel} from "../../../models/route.model";
import {environment} from "../../../../enviroments/enviroment";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {RolesEnum} from "../../../enums/roles.enum";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private userService: UserService, public configService: ConfigService) {}
  isMenuExpanded = true;
  // @ts-ignore
  menuItems: [{ [key: string]: RouteModel[] }] = [];
  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  ngOnInit(): void {
    this.initMenuItems()
  }

  initMenuItems(): void {
    environment.ROUTES.forEach( (route: RouteModel): void => {
      let index: number = this.menuItems.findIndex(
        (el:{ [key: string]: RouteModel[] }): boolean => el.hasOwnProperty(route.category)
      );
      if(!route.roles.find((role: RolesEnum) => role === this.userService.getUser().role ))
        return;
      else if(index === -1)
        this.menuItems.push({[route.category]: [route]})
      else
        this.menuItems[index][route.category].push(route)
    })
  }

  getRoutes(category: { [p: string]: RouteModel[] }) {
    let categoryName: string = Object.keys(category)[0]
    return category[categoryName]
  }

  protected readonly JSON = JSON;

  getCategoryName(category: { [p: string]: RouteModel[] }) {
    return Object.keys(category)[0]
  }
}
