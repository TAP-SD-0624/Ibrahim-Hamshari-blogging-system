import { Strategy as JWTStrategy, ExtractJwt, JwtFromRequestFunction, StrategyOptions } from 'passport-jwt'
import passport from 'passport'
import User from '../models/User';
import userDTO from '../DTO/userDTO';

const SECRET: string | undefined = process.env.SECRET;
if (!SECRET) {
  throw new Error("SECRET IS NOT SET");
}
var opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
}



export default new JWTStrategy(opts, async function (jwt_payload: JWTPayload, done: Function) {
  try {
    const user = await User.findOne({ where: { id: jwt_payload.id } }) ;
    if (!user) {
      return done(null, false);
    }
    return done(null, user.toJSON());
  } catch (err: any) {
    return done(err, false);
  }
});



export interface JWTPayload {
  id: string,
  nickname: string
}