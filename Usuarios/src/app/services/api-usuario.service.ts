import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarioService {

  constructor(
    private httpService: HttpClient
  ) { }

  dadosUsuario(){
    return this.httpService.get('https://jsonplaceholder.typicode.com/users')
  }
}
