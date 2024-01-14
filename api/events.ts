import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendGPTResponse } from './_chat'
import { isValidSlackRequest } from './_validate-request'

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const requestType = request.body.type
  if (requestType === 'url_verification') {
    return response.status(200).json({ challenge: request.body.challenge })
  }

  if (isValidSlackRequest(request)) {
    if (requestType === 'event_callback') {
      const eventType = request.body.event.type
      if (eventType === 'app_mention') {
        await sendGPTResponse(request)
        return response
          .status(200)
          .json({ message: 'Successfully sent GPT Response!' })
      }
    }
  }

  return response.status(200).json({ message: 'OK' })
}
