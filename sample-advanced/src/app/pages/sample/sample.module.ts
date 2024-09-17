import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Sample } from './sample';


@NgModule({
    declarations: [
        Sample
    ],
    imports: [
        IonicPageModule.forChild(Sample)
    ],
    exports: [
        Sample
    ]
})
export class SampleModule {}