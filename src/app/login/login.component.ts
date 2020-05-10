import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProblemaService} from '../services/problema.service';
import {PedidoService} from '../services/pedido.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;
    showPedido: boolean = true;
    itemFormPedido: FormGroup;
    itemFormProblema: FormGroup;

    lsSelectOption$: Observable<any>;

    dominioEmail: string = 'tbclick.ec';

    constructor(private fb: FormBuilder,
                private problemaService: ProblemaService,
                private pedidoService: PedidoService) {
    }

    ngOnInit() {
        this.lsSelectOption$ = this.problemaService.getItemsOptions();
        this.buildFormPedido();
        this.buildFormProblema();
    }

    buildFormPedido() {
        this.itemFormPedido = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(`^.+@${this.dominioEmail}$`)]],
            title: ['', Validators.required],
            anio: ['', Validators.required],
        });
    }

    buildFormProblema() {
        this.itemFormProblema = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(`^.+@${this.dominioEmail}$`)]],
            opcion: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    submitProblema() {
        const data = this.itemFormProblema.getRawValue();
        this.problemaService.setItems(data)
            .then(() => this.itemFormProblema.reset());
    }

    submitPedido() {
        const data = this.itemFormPedido.getRawValue();
        this.pedidoService.setItems(data)
            .then(() => this.itemFormPedido.reset());
    }

}
