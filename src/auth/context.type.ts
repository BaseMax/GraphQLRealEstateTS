import { NextFunction, Request , Response } from 'express'

export type ContextType = {
    req : Request , 
    res : Response ,
    next : NextFunction
}