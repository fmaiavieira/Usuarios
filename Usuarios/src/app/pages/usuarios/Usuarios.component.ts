import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ApiUsuarioService } from 'src/app/services/api-usuario.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  latitude:number;
  longitude:number;
  usuarios: any = []
  constructor( 
    private apiService:ApiUsuarioService,
    ) {}
  

  buscarDados(){
    this.apiService.dadosUsuario().subscribe((resultado) =>{
      console.log(resultado)
      this.usuarios = resultado
      
    })
  }

  usuarioSelecionado = -1;
  mostrarDetalhes(index:number, dado:any) {
    this.latitude = dado.address.geo.lat;
    this.longitude = dado.address.geo.lng;
    if (this.usuarioSelecionado === index) {
      this.usuarioSelecionado = -1;
    } else {
      this.usuarioSelecionado = index;
    }
    
  }
  ngOnInit(): void {
    this.buscarDados();
    
  }

}
