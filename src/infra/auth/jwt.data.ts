import UserRole from '../../shared/model/user.role';

class JwtData {
  public user: Object;
  public payload: {
    roles: Array<UserRole>;
  };
}

export default JwtData;
