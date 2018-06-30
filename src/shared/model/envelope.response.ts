class ResponseEnvelope {
  public data: Object;
  public success: Boolean;
  public message: String;

  static create = (
    data: Object = undefined,
    success: Boolean,
    message: String = ''
  ) => new ResponseEnvelope(data, success, message);

  constructor(data: Object, success: Boolean, message: String) {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}

export default ResponseEnvelope;
