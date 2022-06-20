import { Numero } from './../entity/registro';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionFirestoreService {
  constructor(
    private _firestore:AngularFirestore,
  ) { }

  //método para agregar a la base de datos
postNumero(numero:Numero):Promise<any>{
return this._firestore.collection('peticiones').doc(numero.numero+"").collection("peticion").add({
  numero: numero.numero,
  resultado: numero.resultado,
})
}
}
