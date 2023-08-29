import { StatusResult } from "../utils/status-result.type";
import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateReportInput } from "./dto/create-report.input";
import { ContextType } from "../auth/context.type";
import { IUser } from "../user/user.interface";
import { ReportService } from "./report.service";
import { ReportType } from "./report.type";

@Resolver()
@injectable()
export class ReportResolver {

    constructor(
        private readonly reportService:ReportService , 
    ){}


    @Authorized()
    @Query(()=>[ReportType])
    findAllUserReport(
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser; 
        return this.reportService.findAllUserReport(user);
    }

    @Authorized()
    @Query(()=>ReportType)
    findOneUserReport(
        @Arg('id') id:string , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser; 
        return this.reportService.findOneUserReport(user , id);
    }
    
    @Authorized()
    @Mutation(()=>StatusResult)
    createReport(
        @Arg('input') createReportInput:CreateReportInput , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser; 
        return this.reportService.create(user , createReportInput)
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    RemoveReport(
        @Arg('id') id:string , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser; 
        return this.reportService.remove(user , id)
    }

}