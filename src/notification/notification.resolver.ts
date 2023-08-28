import { Resolver } from "type-graphql";
import { NotificationService } from "./notification.service";
import { injectable } from "tsyringe";

@Resolver()
@injectable()
export class NotificationResolver {
    constructor(
        private readonly notificationService:NotificationService
    ){}
}