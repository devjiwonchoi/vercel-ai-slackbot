import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function events(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const requestType = request.body.type

    if (requestType === 'url_verification') {
      return response.status(200).json({ challenge: request.body.challenge })
    }

    // if (requestType === 'event_callback') {
    //   const eventType = request.body.event.type
    //   if (eventType === 'app_mention') {
    //     const { channel, ts, thread_ts } = request.body.event
    //     const thread = await client.conversations.replies({
    //       channel,
    //       ts: thread_ts ?? ts,
    //       inclusive: true,
    //     })

    //     const prompt = await generatePromptFromThread(thread)
    //     const gptResponse = await getGPTResponse(prompt)

    //     await client.chat.postMessage({
    //       channel,
    //       thread_ts: ts,
    //       text: `${gptResponse.choices[0].message.content}`,
    //     })
    //   }
    // }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      response.status(500).send(error.message)
    }
  }
}
