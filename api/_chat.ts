import type { VercelRequest } from '@vercel/node'
import { WebClient } from '@slack/web-api'
import { getGPTResponse, generatePromptFromThread } from './_openai'

const slack = new WebClient(process.env.SLACK_BOT_TOKEN)

export default async function _chat(request: VercelRequest) {
  const { channel, ts, thread_ts } = request.body.event
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      await slack.chat.postMessage({
        channel,
        thread_ts: ts,
        text: `<@${process.env.ADMIN_USER_ID}> Error: ${error.message}`,
      })
    }
  }
}
