import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/models/users.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeMenu : boolean = false;
  counter = 0;

  token ="";
  profile : User | null = null;

  constructor(private storeService:StoreService , private authService: AuthService ,  private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
  }

  createUser(){
    this.usersService.create({
      name:"Aleja",
      email: "maleja@mail.com",
      password: "ByeHolis",
      avatar:"https://api.lorem.space/image/movie?w=150&h=220"
    }).subscribe(res => console.log(res))
  }

  login(){
    this.authService.login("maleja@mail.com", "ByeHolis")
    .pipe(
      switchMap( token =>{
        this.token = token.access_token
        console.log(token.access_token)
        return this.authService.profile(this.token)
      }
      ))
    .subscribe(res => {
      this.profile = res;
       console.log(res)

    })
  }


  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

}
