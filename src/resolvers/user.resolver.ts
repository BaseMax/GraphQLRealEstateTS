import { Query, Resolver } from "type-graphql";

@Resolver(String)
export class UserResovler {
    @Query(()=>String)
    sayHello(){
        return "hello mamad"
    }
}