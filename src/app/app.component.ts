import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = " ";
  token ="";

  imgRta = "";
  // profile : User = {
  //   id: '',
  //   email: '',
  //   password: '',
  //   name: ''
  // };

  constructor(
    private authService: AuthService ,
    private usersService: UsersService ,
    private fileService: FilesService,
    private tokenService:TokenService
  ){

  }
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.profile()
      .subscribe()
    }
  }

  downloadFile(){
    this.fileService.getFile('my-pdf' , "../assets/files/prueba.pdf", "application/pdf")
    .subscribe()
  }

  uploadFile(event:Event){
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }

}
