import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/models/auth.model';
import { User } from 'src/models/users.model';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`;

  constructor(
    private http : HttpClient
  ) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
  }

  profile(token:string){
    // otra forma de enviar headers
    const headers = new HttpHeaders();
    headers.set("Authorization", `Bearer ${token}`);

    return this.http.get<User>(`${this.apiUrl}/profile` , {
      // esta es una forma de hacer los headers
      headers:{
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    })
  }

  loginAndGet(email:string , password:string){
   return this.login(email, password)
    .pipe(
      switchMap( rta => this.profile(rta.access_token))
    )
  }
}
