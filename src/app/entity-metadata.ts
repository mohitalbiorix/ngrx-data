import { EntityDataModuleConfig } from "@ngrx/data";
import { EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
    Post: {}
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}