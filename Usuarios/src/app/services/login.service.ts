import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../components/login/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuarioAutenticado: boolean = false;

  mostrarLogin = new EventEmitter<boolean>();

  constructor() { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === "usuario@email.com" && 
    usuario.senha === "123456"){

      this.usuarioAutenticado = true;

      this.mostrarLogin.emit(false);

      console.log("sucesso no login")

    } else{

      this.usuarioAutenticado = false;

      console.log("falha no login");
      
      this.mostrarLogin.emit(true);
      
    }
  }
}
