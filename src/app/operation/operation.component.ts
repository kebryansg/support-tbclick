import {Component, OnDestroy, OnInit} from '@angular/core';
import {PedidoService} from '../services/pedido.service';
import {ProblemaService} from '../services/problema.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit, OnDestroy {
    showPedido: boolean = true;

    destroy$: Subject<any> = new Subject<any>();
    listPedido$: Observable<any>;
    listProblema$: Observable<any>;

    constructor(private pedidoService: PedidoService,
                private problemaService: ProblemaService) {
    }

    ngOnInit(): void {
        this.listPedido$ = this.pedidoService.getItems()
            .pipe(
                tap(console.log),
                takeUntil(this.destroy$)
            );

        this.listProblema$ = this.problemaService.getItems()
            .pipe(takeUntil(this.destroy$));
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

}
