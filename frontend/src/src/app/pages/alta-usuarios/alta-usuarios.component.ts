import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrl: './alta-usuarios.component.css'
})
export class AltaUsuariosComponent {
  var_id!:string
  var_rol!:string

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';

      console.log('this.var_id: ',this.var_id);
      console.log('this.var_rol: ',this.var_rol);
    }
}
