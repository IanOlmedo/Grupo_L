import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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

