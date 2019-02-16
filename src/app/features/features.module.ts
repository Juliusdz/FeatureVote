import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import { FeaturesListComponent } from './features-list/features-list.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';
import { FeaturesService } from './services/features.service';

import {MatTableModule} from '@angular/material/table';

export const featuresRoutes: Routes = [
    {
        path: "",
        component: FeaturesListComponent
    },
    {
        path: "create",
        component: FeatureFormComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(featuresRoutes),
        MatTableModule
    ],
    declarations: [FeaturesListComponent, FeatureFormComponent],
    exports: [FeaturesListComponent, FeatureFormComponent, RouterModule],
    entryComponents: [FeaturesListComponent],
    providers: [
        FeaturesService
    ]
})
export class FeaturesModule {


}