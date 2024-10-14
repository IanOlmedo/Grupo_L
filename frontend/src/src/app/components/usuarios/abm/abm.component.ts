import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrl: './abm.component.css'
})
export class AbmComponent {
  @Input() var_id!: string;
  @Input() var_rol!: string;

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
