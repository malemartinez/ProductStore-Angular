import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = " ";
  token ="";

  constructor(
    private authService: AuthService ,  private usersService: UsersService
  ){

  }
  createUser(){
    this.usersService.create({
      name:"Aleja",
      email: "maleja@mail.com",
      password: "ByeHolis"
    }).subscribe(res => console.log(res))
  }
  login(){
    this.authService.login("maleja@mail.com", "ByeHolis")
    .subscribe(res => {
      this.token = res.access_token
      console.log(res.access_token)
    })
  }

  getProfile(){
    this.authService.profile(this.token).subscribe(res => {
      console.log(res)
    })
  }
}
