import type { VercelRequest, VercelResponse } from '@vercel/node'
import { App as Slack } from '@slack/bolt'
import { WebClient } from '@slack/web-api'
import { getGPTResponse, generatePromptFromThread } from '../src/openai'

const { client } = new Slack({
  // To deploy on Vercel, we cannot use the socketMode or its event listening features.
  // Therefore, siginingSecret is required over appToken.
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

const slack = new WebClient(process.env.SLACK_BOT_TOKEN)

export default async function events(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const requestType = request.body.type

    if (requestType === 'url_verification') {
      return response.status(200).json({ challenge: request.body.challenge })
    }

    if (requestType === 'event_callback') {
      const eventType = request.body.event.type
      if (eventType === 'app_mention') {
        const { channel, ts, thread_ts } = request.body.event
        const thread = await slack.conversations.replies({
          channel,
          ts: thread_ts ?? ts,
          inclusive: true,
        })

        const prompt = await generatePromptFromThread(thread)
        const gptResponse = await getGPTResponse(prompt)

        await slack.chat.postMessage({
          channel,
          thread_ts: ts,
          text: `${gptResponse.choices[0].message.content}`,
        })
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      response.status(500).send(error.message)
    }
  }
}
