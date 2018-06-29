import raven from 'raven';
import { relative } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

const packageJson = require('../../../package.json');

function prepareSentryData(data: any): any {
  const stacktrace = data.exception && data.exception[0].stacktrace;
  if (stacktrace && stacktrace.frames) {
    stacktrace.frames.forEach((frame: any) => {
      if (frame.filename.startsWith('/')) {
        frame.filename =
          'app:///' + relative(__dirname || process.cwd(), frame.filename);
      }
    });
  }
  return data;
}

function config(): (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => void {
  raven
    .config(process.env.NODE_ENV === 'production' && process.env.CENTRY_DSN, {
      dataCallback: prepareSentryData,
      release: (packageJson as any).version
    })
    .install();

  return raven.requestHandler();
}

export default {
  config
};
