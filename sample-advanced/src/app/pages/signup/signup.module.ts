import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignUp } from './signup';


@NgModule({
    declarations: [
        SignUp
    ],
    imports: [
        IonicPageModule.forChild(SignUp)
    ],
    exports: [
        SignUp
    ]
})
export class SignUpModule {}