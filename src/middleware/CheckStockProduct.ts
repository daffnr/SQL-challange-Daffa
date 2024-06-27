import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, stock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required and must be a string' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Description is required and must be a string' });
  }
  if (price == null || typeof price !== 'number') {
    return res.status(400).json({ message: 'Price is required and must be a number' });
  }
  if (stock == null || typeof stock !== 'number') {
    return res.status(400).json({ message: 'Stock is required and must be a number' });
  }

  next();
};
