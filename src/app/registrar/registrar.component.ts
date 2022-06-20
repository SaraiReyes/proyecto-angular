import { Numero } from './../entity/registro';
import { ConexionFirestoreService } from './../services/conexion-firestore.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  numero: Numero = new Numero();// elemto para enviar
  resultado: number[] = [];// auxiliar para imprimir resultados
  bandera:boolean=false//para mostrar o no la lista de numeros

  constructor(private _numeroService: ConexionFirestoreService) {}

  ngOnInit(): void {}
  // método para registrar
  registrar() {
    Swal.fire('Enviando peticion')
    Swal.showLoading();// indicamos que se esta haciendo la peticion al servidor
    this.bandera=false//ocultamos la seccion de los numeros multiplos con esta bandera
    this.resultado = [];
    let i = 0;
    let aux = '';
    for (i = 0; i < this.numero.numero!; i++) {// recorre los números del 0 a N
      if (i % 3 == 0 || i % 5 == 0 || i % 7 == 0) {// multiplos de 3,5 y 7
        this.resultado.push(i);// agregamos al arreglo
        aux += i + ', ';// agregamos a la cadena que será enviada en el post
      }
    }
    this.numero.resultado = aux;//agregamos la cadena de los números que son multiplos

    this._numeroService
      .postNumero(this.numero)
      .then((params) => {// invocamos el servicio para hacer el post
        Swal.close()
        if (params)// si regresa un parametro nos indicara que se esta realiazando el post correctamente y enviamos un mensaje
         {
          Swal.fire(
            'Registro exitoso',
            'Su registro fue enviado con exito',
            'success'
          );
          this.bandera=true//  se habilitara la vista de los numeros multiplos
         }
        else// si no regresa nada notificamos que no se ha enviado al post
          Swal.fire(
            'Registro no exitoso',
            '¡Algo ha salido mal, intentelo mas tarde!',
            'error'
          );
      })
      .catch((error) => {// por ultimo si ocurre un error tambien notificamos del mismo
        Swal.fire('Oops', '¡Algo ha salido mal, intentelo mas tarde!', 'error');
        console.log(error);
        Swal.close()// cerramos el mensaje
      });
  }

  comparar(numero: number) {// metodo para pintar de colores los numeros resultantes
    let color = '#008000';
    if (numero % 7 == 0) color = '#0000FF'; // regresa color azul si es multiplo de 7
    if (numero % 5 == 0) color = '#FF0000'; // regresa color rojo si es multiplo de 5
    if (numero % 3 == 0) color = '#008000'; // regresa verde si es multiplo de 3
    return color; // regresamor el color del numero menor posible
  }
}
