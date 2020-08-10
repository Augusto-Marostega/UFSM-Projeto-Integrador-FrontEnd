import { NgModule } from '@angular/core';
import { FilterPipeDoceByName } from './filterDoceByName.pipe';

@NgModule({
    declarations: [FilterPipeDoceByName],
    exports: [FilterPipeDoceByName]
})
export class FilterPipeDoceByNameModule {
}