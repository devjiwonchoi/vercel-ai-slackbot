import { sendGPTResponse } from './_chat'
import { isValidSlackRequest } from './_validate-request'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const payload = JSON.parse(rawBody)
  const requestType = payload.type

  // See https://api.slack.com/events/url_verification
  if (requestType === 'url_verification') {
    return new Response(payload.challenge, { status: 200 })
  }

  if (await isValidSlackRequest({ request, rawBody })) {
    if (requestType === 'event_callback') {
      const eventType = payload.event.type
      if (eventType === 'app_mention') {
        await sendGPTResponse(payload.event)
        return new Response('Success!', { status: 200 })
      }
    }
  }

  return new Response('Unauthorized', { status: 401 })
}
