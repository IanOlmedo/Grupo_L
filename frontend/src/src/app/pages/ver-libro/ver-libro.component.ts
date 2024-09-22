import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css'
})
export class VerLibroComponent {
  var_id!:string
  var_rol!:string
  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';
  }
  
}
