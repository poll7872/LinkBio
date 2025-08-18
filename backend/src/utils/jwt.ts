import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateJwt = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '2d', // Token will expire in 2 08/18/2025
  })

  return token
}
