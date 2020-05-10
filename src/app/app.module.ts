import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { OperationComponent } from './operation/operation.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        OperationComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        NgSelectModule,
        AngularFireModule.initializeApp(environment.settingsFirebase),
        // AngularFirestoreModule.enablePersistence(),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
