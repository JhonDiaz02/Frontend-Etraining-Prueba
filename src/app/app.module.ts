import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormularioCursoComponent } from './formulario-curso/formulario-curso.component';
import { ListaCursoComponent } from './lista-curso/lista-curso.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    FormularioCursoComponent,
    ListaCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
