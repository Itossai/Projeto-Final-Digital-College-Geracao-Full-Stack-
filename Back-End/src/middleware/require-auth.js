import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    'Missing JWT configuration: set JWT_SECRET in Back-End/.env.',
  );
}

export default function requireAuth(request, response, next) {
  const authorization = request.get('authorization') || '';
  const match = /^Bearer\s+(\S+)$/i.exec(authorization);

  if (!match) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(match[1], jwtSecret, {
      algorithms: ['HS256'],
    });

    if (
      !payload ||
      typeof payload !== 'object' ||
      typeof payload.sub !== 'string'
    ) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    request.auth = { userId: payload.sub };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    return next(error);
  }

  return next();
}
