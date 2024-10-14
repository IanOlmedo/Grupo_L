import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {
  var_id!: string;
  var_rol!: string;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';
    
    
    console.log('this.var_id: ',this.var_id);
    console.log('this.var_rol: ',this.var_id);

  }
}
