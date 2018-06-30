import passport from 'passport';
import JwtData from '../auth/jwt.data';
import UserRole from '../../shared/model/user.role';

const handleJWT = (
  request: Express.Request,
  responde: Express.Response,
  next: Function,
  roles: Array<string>
) => async (err: Error, data: JwtData, info: Object) => {
  const error = err || info;
  const { logIn } = request;
  const { user, payload } = data;

  try {
    if (error || !user) throw error;
    logIn(user, { session: false }, undefined);
  } catch (e) {
    return next(e);
  }

  const notHaveRole = payload.roles.some((role: UserRole) =>
    roles.some(x => x === role.name)
  );

  if (notHaveRole) {
    responde.error('Forbidden', 403);
    return next();
  }
  request.user = user;
  return next();
};

const authorize = (roles: Array<string>) => (
  request: Express.Request,
  response: Express.Response,
  next: Function
) =>
  passport.authenticate(
    'jwt',
    { session: false },
    handleJWT(request, response, next, roles)
  )(request, response, next);

export default { authorize };
