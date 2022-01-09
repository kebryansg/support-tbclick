import {Component, OnDestroy, OnInit} from '@angular/core';
import {PedidoService} from '../services/pedido.service';
import {ProblemaService} from '../services/problema.service';
import {from, Observable, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit, OnDestroy {
    tipoSolicitud: 'PED' | 'PRO' = 'PED';

    destroy$: Subject<any> = new Subject<any>();
    listItems$: Observable<any>;
    listPedido$: Observable<any>;
    listProblema$: Observable<any>;

    constructor(private pedidoService: PedidoService,
                private problemaService: ProblemaService) {
    }

    ngOnInit(): void {
        this.setTipoSolicitud('PED');
        /*
        this.listPedido$ = this.pedidoService.getItems()
            .pipe(
                tap(console.log),
                takeUntil(this.destroy$)
            );

        this.listProblema$ = this.problemaService.getItems()
            .pipe(takeUntil(this.destroy$));
        */
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    eliminarPedido(cod: string) {
        this.pedidoService.deleteItems(cod)
            .then();
    }

    eliminarProblema(cod: string) {
        this.problemaService.deleteItems(cod)
            .then();
    }

    async eliminarRegistro(cod: string) {
        await (this.tipoSolicitud == 'PED' ? this.pedidoService.deleteItems(cod)
            : this.problemaService.deleteItems(cod));
    }

    setTipoSolicitud(tipo: 'PED' | 'PRO') {
        this.tipoSolicitud = tipo;

        this.listItems$ = from(tipo == 'PED' ? this.pedidoService.getItems()
            : this.problemaService.getItems())
            .pipe(
                tap(console.log),
                map(ls =>
                    ls.map(({id, data}) => ({
                        id,
                        ...data
                    }))
                ),
                takeUntil(this.destroy$)
            );
    }

    setColumns(tipo: 'PED' | 'PRO') {
        const columns = {
            'PED': [
                'Acción',
                'Sección',
                'Titulo',
                'Año',
                'Solicita',
            ],
            'PRO': [
                'Acción',
                'Sección',
                'Opción',
                'Descripción',
                'Solicita',
            ],
        };
        return columns[tipo] ?? [];
    }

}
