import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

const collectionPedido = 'pedido';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    constructor(private afd: AngularFirestore) {
    }

    getItems() {
        return this.afd.collection(collectionPedido)
            .snapshotChanges()
            .pipe(
                map(results => results.map(row => ({
                    id: row.payload.doc.id,
                    data: row.payload.doc.data()
                })))
            );
    }

    setItems(data: any) {
        return this.afd.collection(collectionPedido)
            .add(data);
    }

    updateItems(idDoc: string, data: any) {
        return this.afd.collection(collectionPedido)
            .doc(idDoc)
            .update(data);
    }

    deleteItems(idDoc: string) {
        return this.afd.collection(collectionPedido)
            .doc(idDoc)
            .delete();
    }
}
