import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private authService: AuthService ,  private usersService: UsersService ,
    private fileService: FilesService
  ){

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
