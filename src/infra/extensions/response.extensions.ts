import ResponseEnvelope from '../../shared/model/envelope.response';

const success = (data: Object) =>
  this.send(ResponseEnvelope.create(data, true));

const error = (message: String) =>
  this.send(ResponseEnvelope.create(null, false, message));

export default {
  success,
  error
};
