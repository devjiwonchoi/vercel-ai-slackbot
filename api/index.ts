import OpenAI from 'openai'
import Slack from '@slack/bolt'

const slack = new Slack.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
})

slack.start()
slack.event('app_mention', async ({ event, say }) => {
  const gptResponse = await getGPTResponse(event.text)
  await say(`${gptResponse.choices[0].message.content}`)
})

const openai = new OpenAI() // process.env.OPENAI_API_KEY
async function getGPTResponse(text: string) {
  return await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: text }],
  })
}
