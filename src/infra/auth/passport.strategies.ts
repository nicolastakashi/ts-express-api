import { Strategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
};

const jwt = async (payload: Object, done: Function) => {
  try {
    // const user = await userRepository.findById(payload.sub);
    // if (user) return done(null, { payload, user });
    return done(undefined, false);
  } catch (error) {
    return done(error, false);
  }
};

export default {
  jwt: new Strategy(jwtOptions, jwt)
};
