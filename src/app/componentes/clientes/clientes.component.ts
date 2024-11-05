import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  constructor(
    private clientesServicio: ClienteServicio,
    private toastr: ToastrService
  ) {}

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }

    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.toastr.error('Por favor, llene el formulario correctamente');
    } else {
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.toastr.success('Cliente agregado correctamente');
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
