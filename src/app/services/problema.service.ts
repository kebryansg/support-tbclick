import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

const collectionProblema = 'problema';

@Injectable({
    providedIn: 'root'
})
export class ProblemaService {

    constructor(private afd: AngularFirestore) {
    }

    getItems() {
        return this.afd.collection(collectionProblema)
            .snapshotChanges()
            .pipe(
                map(results => results.map(row => ({
                    id: row.payload.doc.id,
                    data: row.payload.doc.data()
                })))
            );
    }

    getItemsOptions() {
        return this.afd.collection('problema_opciones')
            .snapshotChanges()
            .pipe(
                map(results => results.map(row => row.payload.doc.data()))
            );
    }

    getItemsSeccions() {
        return this.afd.collection('seccion')
            .snapshotChanges()
            .pipe(
                map(results => results.map(row => row.payload.doc.data()))
            );
    }

    setItems(data: any) {
        return this.afd.collection(collectionProblema)
            .add(data);
    }

    updateItems(idDoc: string, data: any) {
        return this.afd.collection(collectionProblema)
            .doc(idDoc)
            .update(data);
    }

    deleteItems(idDoc: string) {
        return this.afd.collection(collectionProblema)
            .doc(idDoc)
            .delete();
    }
}
