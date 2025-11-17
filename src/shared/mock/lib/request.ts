/**
 * 从请求头提取 Bearer token
 */
export function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.get('Authorization')
  if (!authorization) {
    return null
  }

  const [scheme, token] = authorization.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return null
  }

  return token
}
