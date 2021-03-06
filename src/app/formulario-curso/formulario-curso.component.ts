import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
      nombre: [this.curso ? this.curso.nombre : "", Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]{2,254}"),Validators.maxLength(40)])],
      inicio_curso: [this.curso ? this.curso.inicio_curso : "", Validators.compose([Validators.required])],
      final_curso: [this.curso ? this.curso.final_curso : "", Validators.compose([Validators.required])]
    });
  }

  save() {
    if (this.form.invalid) {
      this.toastr.warning("Ingrese todos los campos");
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
          this.toastr.error("El curso NO se actualizo")
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
          this.toastr.error("El curso NO se creo")
        });
    }
  }

  user_validation_messages = {
    'nid': [
        { type: 'required', message: 'NID is required' },
        { type: 'minlength', message: 'NID must be at least 6 characters long' },
        { type: 'maxlength', message: 'NID cannot be more than 10 characters long' },
        { type: 'pattern', message: 'Your NID must contain only numbers' }
    ],
  }

}
