import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioCursoComponent } from '../formulario-curso/formulario-curso.component';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.scss']
})
export class ListaCursoComponent implements OnInit {

  constructor(private apiService: ApiServiceService, private modalService:NgbModal, private toastr: ToastrService ) { }

  cursos?: any[];

  ngOnInit() {
    this.list();
  }

  delete(id:any){
    this.apiService.Delete("curso",id).then(x => {
      this.toastr.success("Eliminado");
      this.list();
    }).catch(x=>{
      this.toastr.success("No se puede Eliminar");
    });
  }

  list(){
    this.apiService.Get("curso").then(x => {
      this.cursos = x;
    }).catch(x=>{
      this.toastr.success("No se pueden obtener los datos");
    });
  }

  EditCurso(curso:any){
    const modalRef = this.modalService.open(FormularioCursoComponent, { size: 'lg', backdrop: 'static',  });
    modalRef.componentInstance.curso = curso;
  }

}
