export function getCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader)
    return null

  for (const chunk of cookieHeader.split(';')) {
    const [rawKey, ...rest] = chunk.trim().split('=')
    if (rawKey === name)
      return rest.join('=').trim() || null
  }

  return null
}
