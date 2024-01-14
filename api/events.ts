import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendGPTResponse } from './_chat'
import { isValidSlackRequest } from './_validate-request'

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const {
    challenge,
    type: requestType,
    event: { type: eventType },
  } = request.body

  if (requestType === 'url_verification') {
    return response.status(200).json({ challenge })
  }

  if (isValidSlackRequest(request)) {
    if (requestType === 'event_callback') {
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
