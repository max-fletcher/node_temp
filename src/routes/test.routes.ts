import express, { Request, Response } from 'express';
import { multipleFileLocalUploader } from '../middleware/fileUploadLocal.middleware';
import { fileDeleteTest, fileUploadTest } from '../controllers/test.controller';
import { RedisService } from '../services/redis.service';

const redisService = new RedisService();

const testRouter = express.Router();

testRouter.get('/hello', (req: Request, res: Response) => {
  res.send('Hello User!!');
});

testRouter.post(
  '/fileUploadTest',
  multipleFileLocalUploader(
    [
      { name: 'images1', maxCount: 1 },
      { name: 'images2', maxCount: 2 },
    ],
    'files',
    31457280,
  ),
  fileUploadTest,
);

testRouter.delete('/fileDeleteTest/:id', fileDeleteTest);

testRouter.post('/redis/setData', async (req: Request, res: Response) => {
  try {
    const { key, expiresIn, data } = req.body
    await redisService.setRedisData(key, JSON.stringify(data), expiresIn);
    res.send({
      message: 'success',
    });
  } catch (error) {
    res.status(500).send({
      message: `${error}`,
    });
  }
});

testRouter.post('/redis/getData', async (req: Request, res: Response) => {
  try {
    const { key } = req.body
    const data = await redisService.getRedisData(key);
    res.send({
      message: 'success',
      data: data ? JSON.parse(data) : null
    });
  } catch (error) {
    res.status(500).send({
      message: `${error}`,
    });
  }
});

export { testRouter };
