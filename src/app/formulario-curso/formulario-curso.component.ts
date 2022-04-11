import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-curso',
  templateUrl: './formulario-curso.component.html',
  styleUrls: ['./formulario-curso.component.scss']
})
export class FormularioCursoComponent implements OnInit {

  @Input() public curso: any;
  form!: FormGroup;

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [this.curso ? this.curso.nombre : "", Validators.compose([Validators.required])],
      inicio_curso: [this.curso ? this.curso.inicio_curso : "", Validators.compose([Validators.required])],
      final_curso: [this.curso ? this.curso.final_curso : "", Validators.compose([Validators.required])]
    });
  }

  save() {
    if (this.form.invalid) {
      alert("Ingrese todos los campos");
    } else {
      if (this.curso)
        this.apiService.Update("curso",
          {
            nombre: this.form.controls['nombre'].value,
            inicio_curso: this.form.controls['inicio_curso'].value,
            final_curso: this.form.controls['final_curso'].value
          },
          this.curso.id
        ).then(x => {
          this.toastr.success("El curso se actualizo")
        }).catch(x => {
          this.toastr.success("El curso NO se actualizo")
        });
      else
        this.apiService.Post("curso",
          {
            nombre: this.form.controls['nombre'].value,
            inicio_curso: this.form.controls['inicio_curso'].value,
            final_curso: this.form.controls['final_curso'].value
          }
        ).then(x => {
          this.toastr.success('El curso se creo');
        }).catch(x => {
          this.toastr.success("El curso NO se creo")
        });
    }
  }

}
