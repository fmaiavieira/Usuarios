import { Component, OnInit } from '@angular/core';
import { ApiUsuarioService } from 'src/app/services/api-usuario.service'
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  // array que recebe o resultado da busca na api
  usuarios:any = []

  usuariosFavoritos:any = []

  pagina= true;
  // valores que o maps utiliza para mostrar o endereço do usuario
  latitude:number = -37.3159;
  longitude:number = -37.3159;

  constructor( 
    private apiService:ApiUsuarioService,
    private loginService: LoginService
    ) {}
  
// função que faz a requisição na api através do service assim que a pagina carrega.
  buscarDados(){
    this.apiService.dadosUsuario().subscribe((resultado) =>{
      console.log(resultado)
      this.usuarios = resultado
      
    })
  }

  usuarioLogado:boolean = true;

  statusFavoritar:boolean = true;

// variavel para definir se os detalhes devem ser exibidos/ocultos.
  usuarioSelecionado = -1;


// função que recebe como parametro o Index do usuario utilizado para 
// mostrar detalhes, e o parametro dado que é utilizado para obter os 
// valores de latitude e longitude de cada usuario.
  mostrarDetalhes(index:number, dado:any) {
    this.latitude = Number.parseFloat(dado.address.geo.lat);
    this.longitude = Number.parseFloat(dado.address.geo.lgn);
    if (this.usuarioSelecionado === index) {
      this.usuarioSelecionado = -1;
    } else {
      this.usuarioSelecionado = index;
    }
  }

  
  estaFavoritado(dado:any){
    return this.usuariosFavoritos.findIndex((val: any) => val.id == dado.id)
  }

  favoritar(dado:any){
    let resultado = this.usuariosFavoritos.findIndex((val: any) => val.id == dado.id)
    if(resultado < 0){
      this.usuariosFavoritos.push({...dado})
      console.log("favoritou", this.usuariosFavoritos)
    }
    else{
      this.usuariosFavoritos.splice(resultado, 1)
      console.log("desfavoritou", this.usuariosFavoritos)
    }
    
  }

  mudarPaginaFavoritos(){
    this.pagina = false
  }
  mudarPaginaUsuarios(){
    this.pagina = true
  }

 

  ngOnInit(): void {
    this.buscarDados();
    this.loginService.mostrarLogin.subscribe(
      (mostrar: boolean) => this.usuarioLogado = mostrar
    );
  }
}
