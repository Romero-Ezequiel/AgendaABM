import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  listAgendas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _agendaService: AgendaService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      domicilio: ['', [Validators.required]]

    });
   }

  ngOnInit(): void {
    this.obtenerAgendas();
  }

  obtenerAgendas() {
    this._agendaService.getListAgendas().subscribe(data => {
      console.log(data);
      this.listAgendas = data;
    }, error => {
      console.log(error);
    });
  }

  guardarAgenda() {

    const agenda: any = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      telefono: this.form.get('telefono')?.value,
      domicilio: this.form.get('domicilio')?.value,
    }

    if(this.id == undefined) {
        this._agendaService.saveAgenda(agenda).subscribe(data => {
          this.toastr.success('La agenda fue registrada con exito!', 'Agenda Registrada');
          this.obtenerAgendas();
          this.form.reset();
        }, error => {
          this.toastr.error('Ocurrio un error','Error')
          console.log(error);
        });
    }else {

      agenda.id = this.id;
      this._agendaService.updateAgenda(this.id, agenda).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La agenda fue actualizada con exito!', 'Agenda Actualizada');
        this.obtenerAgendas();
      }, error => {
        console.log(error);
      });
    }
  }

  eliminarAgenda(id: number) {
    this._agendaService.deleteAgenda(id).subscribe(data => {
      this.toastr.error('La agenda fue eliminada con exito!','Agenda eliminada');
      this.obtenerAgendas();
    }, error => {
      console.log(error);
    });
  }

  editarAgenda(agenda: any) {
    this.accion = 'Editar';
    this.id = agenda.id;

    this.form.patchValue({
      nombre: agenda.nombre,
      apellido: agenda.apellido,
      telefono: agenda.telefono,
      domicilio: agenda.domicilio
    });
  }

}
