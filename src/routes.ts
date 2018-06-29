import { Router } from 'express';

const router = Router();

/**
 *
 * @api {get} /status API Status
 * @apiName Sétima
 * @apiGroup Info
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *    status : 'Ok',
 *    environment: 'development'
 * }
 *
 */
router.get('/status', async (request, response) =>
  response.success({ status: 'Ok', environment: process.env.NODE_ENV })
);

export default router;
