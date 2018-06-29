import ResponseEnvelope from '../../shared/model/envelope.response';

function success(data: Object) {
  return this.send(ResponseEnvelope.create(data, true));
}

function error(message: string) {
  return this.send(ResponseEnvelope.create(null, false, message));
}

export default {
  success,
  error
};
