import { Component, OnInit } from '@angular/core';

import { User } from 'src/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : User | null = null;

  constructor( private authSrvice: AuthService) { }

  ngOnInit(): void {
    this.authSrvice.profile()
    .subscribe(rta => this.user = rta )
  }

}
