// This code snippet is based on https://github.com/vercel/examples/blob/main/solutions/slackbot/api/_validate.js
// To know more about validating requests from Slack, check out https://api.slack.com/authentication/verifying-requests-from-slack
import crypto from 'crypto'
const signingSecret = process.env.SLACK_SIGNING_SECRET!

export function isValidSlackRequest(event: any) {
  const { body, headers } = event
  const requestBody = JSON.stringify(body)

  const timestamp = headers['x-slack-request-timestamp']
  const slackSignature = headers['x-slack-signature']
  const baseString = 'v0:' + timestamp + ':' + requestBody

  const hmac = crypto
    .createHmac('sha256', signingSecret)
    .update(baseString)
    .digest('hex')
  const computedSlackSignature = 'v0=' + hmac
  const isValidRequest = computedSlackSignature === slackSignature

  return isValidRequest
}
