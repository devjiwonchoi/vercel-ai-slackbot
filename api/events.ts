import { sendGPTResponse } from './_chat'
import { isValidSlackRequest } from './_validate-request'

export async function POST(request: Request) {
  const body = await request.json()
  const requestType = body.type

  // See https://api.slack.com/events/url_verification
  if (requestType === 'url_verification') {
    return new Response(body.challenge, { status: 200 })
  }

  // if (await isValidSlackRequest(request)) {
  if (requestType === 'event_callback') {
    const eventType = body.event.type
    if (eventType === 'app_mention') {
      await sendGPTResponse(body.event)
      return new Response('Success!', { status: 200 })
    }
  }
  return new Response('Unhandled event type', { status: 200 })
  // }

  return new Response('Unauthorized', { status: 401 })
}
