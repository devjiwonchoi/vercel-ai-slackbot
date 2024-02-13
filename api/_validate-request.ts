import crypto from 'crypto'

const signingSecret = process.env.SLACK_SIGNING_SECRET!

// See https://api.slack.com/authentication/verifying-requests-from-slack
export async function isValidSlackRequest(request: Request, payload: any) {
  const timestamp = request.headers.get('X-Slack-Request-Timestamp')
  const slackSignature = request.headers.get('X-Slack-Signature')

  const base = `v0:${timestamp}:${JSON.stringify(payload)}`
  const hmac = crypto
    .createHmac('sha256', signingSecret)
    .update(base)
    .digest('hex')
  const computedSignature = `v0=${hmac}`

  return computedSignature === slackSignature
}
