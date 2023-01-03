import {Component, OnInit} from '@angular/core';
import * as http from "http";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "./user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  token: any;
  user = [];
  a: User[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.token =  JSON.parse(localStorage.getItem('token'));
    this.getUsers();
  }

  getUsers(): any {
    const parameters = {};
    const params = new HttpParams({
      fromObject: parameters
    });
    const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    const options = {params: params, headers: httpHeaders};
    this.httpClient.get<[]>('http://localhost:8080/admin/realms/Test-Angular/users', options).subscribe(
      response => {
        console.log(typeof response);
        // @ts-ignore
        const mapped = Object.keys(response).map(key => (this.user.push(response[key].username)));
      }
    )
  }
}
