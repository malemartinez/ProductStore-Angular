import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

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
    
    return this.http.get(`${this.apiUrl}/profile` , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }
}
