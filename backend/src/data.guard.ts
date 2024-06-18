import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FillDatabaseService } from "./fill-database/fill-database.service";
import { Observable } from "rxjs";

@Injectable()
export class DataGuard implements CanActivate {
    constructor(private readonly dataService: FillDatabaseService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await this.dataService.isEmpty();
        return true;
    }
}