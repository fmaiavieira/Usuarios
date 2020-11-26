import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public usuario: Usuario = new Usuario();

  mostrarLogin:boolean = true;

  sair(){
    this.loginService.fazerLogin(this.usuario)
  }
  ngOnInit(): void {
    this.loginService.mostrarLogin.subscribe(
      (mostrar: boolean) => this.mostrarLogin = mostrar
    );
  }

  
}
