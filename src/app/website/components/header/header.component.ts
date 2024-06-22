import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';
import { Category } from 'src/models/products.model';
import { User } from 'src/models/users.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeMenu : boolean = false;
  counter = 0;
  categories : Category[] = [];
  profile : User | null = null;


  constructor(
    private storeService:StoreService ,
    private authService: AuthService ,
    private usersService: UsersService,
    private categoriesService:CategoriesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCategories()
    this.authService.userState$
    .subscribe(data => this.profile = data)
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data =>{
      this.categories = data
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
    // this.authService.login("maleja@mail.com", "ByeHolis")
    // .pipe(
    //   switchMap( token =>{
    //     this.token = token.access_token
    //     console.log(token.access_token)
    //     return this.authService.profile(this.token)
    //   }
    //   ))
    this.authService.loginAndGet("maleja@mail.com", "ByeHolis")
    .subscribe(()=> this.router.navigate(['/profile']))
  }

  logout(){
    this.authService.logout();
    this.profile=null;
    this.router.navigate(['/login'])
  }


  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

}
