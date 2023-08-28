import { AuthChecker } from 'type-graphql';
import { ContextType } from './context.type'; 
import passport from 'passport';

export const authChecker: AuthChecker<ContextType> = async ({ context }) => {
  return new Promise<boolean>((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return resolve(false);
      }
      context.req.user = user; 
      resolve(true);
    })(context.req, context.res);
  });
};