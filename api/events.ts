import type { VercelRequest, VercelResponse } from '@vercel/node'
import chat from './_chat'

export default async function events(
  request: VercelRequest,
  response: VercelResponse
) {
  const requestType = request.body.type

  if (requestType === 'url_verification') {
    return response.status(200).json({ challenge: request.body.challenge })
  }

  if (requestType === 'event_callback') {
    const eventType = request.body.event.type
    if (eventType === 'app_mention') {
      chat(request)
    }
  }
}
