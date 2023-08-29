import { Prisma, PrismaClient, Report } from "@prisma/client";
import { IUser } from "../user/user.interface";
import { inject, injectable } from "tsyringe";
import { CreateReportInput } from "./dto/create-report.input";
import { StatusResult } from "../utils/status-result.type";
import { ErrorName } from "../utils/errors/http-error";

@injectable()
export class ReportService { 
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient
    ){}


    async findOne(where:Prisma.ReportWhereInput):Promise<Report>{
        return await this.prisma.report.findFirst({
            where , 
            include : {
                proprty : true , 
                user : true , 
            }
        })
    }


    async findAll():Promise<Report[]>{
        return await this.prisma.report.findMany({
            include : {
                proprty : true , 
                user : true , 
            }
        })
    }

    async findAllUserReport(user:IUser):Promise<Report[]>{
        return await this.prisma.report.findMany({
            where : {
                userId : user.id , 
            } , 
            include : {
                proprty : true , 
                user : true , 
            }
        })
    }

    async findOneUserReport(user:IUser , id:string):Promise<Report>{
        const report = await this.prisma.report.findFirst({
            where : {
                userId : user.id , 
                id , 
            } , 
            include : {
                user : true , 
                proprty : true , 
            }
        })

        if(!report){
            throw new Error(ErrorName.NOTFOUND);
        }

        return report ; 
    }


    async create(user:IUser , createReportInput:CreateReportInput):Promise<StatusResult>{
        const {
            propertyId , 
            text 
        } = createReportInput ;


        const newReport = await this.prisma.report.create({
            data : {
                text , 
                propertyId , 
                userId : user.id ,
            }
        })


        return {
            message : 'Item creatd successfully' , 
            success : true , 
            id : newReport.id , 
        }
    }

    async remove(user:IUser , id : string):Promise<StatusResult>{
        await this.findOneUserReport(user , id);
        await this.prisma.report.delete({where:{id}})

        return {
            message : 'Item removed successfully' , 
            success : true , 
        }
    }
}