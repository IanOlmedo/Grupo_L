import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pres-s-p',
  templateUrl: './pres-s-p.component.html',
  styleUrl: './pres-s-p.component.css'
})
export class PresSPComponent {
  @Input() var_rol!: string
  @Input() var_id!: string

}
