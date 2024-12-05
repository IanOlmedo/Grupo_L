import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AutoresService } from '../../services/autores.service';

@Component({
  selector: 'app-alta-autores',
  templateUrl: './alta-autores.component.html',
  styleUrl: './alta-autores.component.css'
})
export class AltaAutoresComponent {
  var_id!:string

  autorForm = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
    nacionalidad: new FormControl('', Validators.required)
  })

  constructor(
    private route:ActivatedRoute,
    private autorService: AutoresService,
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.var_id)
    if (this.var_id){
      this.autorService.getOneAutor(this.var_id).subscribe((autor:any)=>{
        this.autorForm.patchValue(autor);
      })
    }
  }

  onSubmit(){
    if (this.autorForm.valid) {
      if (this.var_id !== '') {

        this.autorService.updateAutor(this.var_id, this.autorForm.value).subscribe(
          () => {
            alert('Autor actualizado correctamente')
        },
      (error) => {
        alert('Error al al actualizar el autor: ' + error.message)
      });
      } else {
        this.autorService.createAutor(this.autorForm.value).subscribe(() => {
          alert('Autor creado correctamente')
        },
      (error)=>{
        alert('Error al crear el autor '+error.message)
      });
      }
    }
  }
}
