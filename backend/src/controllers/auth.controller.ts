import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { env } from '../config/env';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, env.JWT_ACCESS_SECRET as string, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as jwt.SignOptions);

  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET as string, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as jwt.SignOptions);

  return { accessToken, refreshToken };
};

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ status: 'error', message: 'Please provide name, email and password' });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ status: 'error', message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const { accessToken, refreshToken } = generateTokens(user._id.toString());
      setTokenCookies(res, accessToken, refreshToken);

      res.status(201).json({
        status: 'success',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ status: 'error', message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id.toString());
      setTokenCookies(res, accessToken, refreshToken);

      res.status(200).json({
        status: 'success',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      res.status(200).json({
        status: 'success',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ status: 'error', message: 'Not authorized, no refresh token' });
      return;
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
      return;
    }

    const tokens = generateTokens(user._id.toString());
    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({ status: 'success', message: 'Token refreshed' });
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Not authorized, refresh token failed' });
  }
};
