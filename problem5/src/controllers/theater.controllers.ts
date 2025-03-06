import { Request, Response } from 'express';
import Theater from '../models/theater.model';
import { theaterValidator } from '../middleware/validation.middleware';
import mongoose from 'mongoose';
export const getTheaters = async (req: Request, res: Response) => {
  try {
    const { street1, city, page = 1, limit = 20 } = req.query;

    const query: any = { isDeleted: false };

    if (street1) {
      query['location.address.street1'] = { $regex: street1, $options: 'i' };
    }

    if (city) {
      query['location.address.city'] = { $regex: city, $options: 'i' };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const theaters = await Theater.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select('location.address');

    const totalCount = await Theater.countDocuments(query);

    res.status(200).json({
      message: 'Get theaters',
      result: theaters,
      pagination: {
        page: page,
        limit: limit,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getTheaterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!checkFormatId(id)) {
      res.status(400).json({ message: 'Invalid theater ID format' });
      return;
    }

    const theater = await Theater.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!theater) {
      res.status(404).json({ message: 'Theater not found or is deleted' });
    }
    else {
      res.status(200).json({ message: 'Get theater', result: theater });
    }
  } catch (error) {
    console.error('Error fetching theater by ID:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const createTheater = async (req: Request, res: Response) => {
  try {
    const { error } = theaterValidator.validate(req.body);
    if (error) {
      res.status(400).json({ message: 'Invalid request body', details: error.details });
    }
    const theater = await Theater.create(req.body);

    res.status(200).json({ message: 'Create theater', result: theater });
  } catch (error) {
    console.error('Error creating theater:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!checkFormatId(id)) {
      res.status(400).json({ message: 'Invalid theater ID format' });
      return;
    }

    const { error } = theaterValidator.validate(req.body);
    if (error) {
      res.status(400).json({ message: 'Invalid request body', details: error.details });
    }

    const theater = await Theater.findByIdAndUpdate(id, req.body, { new: true });

    if (!theater) {
      res.status(404).json({ message: 'Theater not found' });
      return;
    }

    res.status(200).json({ message: 'Update theater', result: theater });
  } catch (error) {
    console.error('Error updating theater:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!checkFormatId(id)) {
      res.status(400).json({ message: 'Invalid theater ID format' });
      return;
    }

    const theater = await Theater.findOne({ _id: id, isDeleted: false });

    if (!theater) {
      res.status(404).json({ message: 'Theater not found or already deleted' });
    }
    else {
      await Theater.updateOne({ _id: id }, { isDeleted: true });
      res.status(200).json({ message: 'Delete theater', result: theater });
    }

  } catch (error) {
    console.error('Error deleting theater:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const checkFormatId = (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    return false;
  }
  return true;
};