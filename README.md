# Vercel AI Slack Bot

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/devjiwonchoi/vercel-ai-slackbot&env=OPENAI_API_KEY,SLACK_BOT_TOKEN,SLACK_SIGNING_SECRET,SLACK_ADMIN_MEMBER_ID)

## Environment Variables

> Check out [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for more information.

### OpenAI API Key

- Create a new key on [OpenAI API Keys](https://platform.openai.com/api-keys) and "Create new secret key", optionally naming the key.
- Add the key to Vercel's environment variables as `OPENAI_API_KEY`.

### Slack Bot Token & Signing Secret

Go to [Slack API Apps Page](https://api.slack.com/apps):

- Create new App
  - From Scratch
  - Name your app & pick a workspace
- Go to Oauth & Permissions
  - Add the following scopes
    - `app_mentions:read`
    - `channels:history`
    - `chat:write`
    - `commands`
  - Copy **Bot User OAuth Token**
  - Add the token to Vercel's environment variables as `SLACK_BOT_TOKEN`
- Install App to workspace
  - Basic Information --> Install Your App--> Install To Workspace
  - App Credentials--> Coppy **Signing Secret**
  - Add the secret to Vercel's environment variables as `SLACK_SIGNING_SECRET`

### Admin's Slack Member ID

- Click on your profile picture in Slack and click **Profile**.
- Click on the three dots in the middle right corner and select **Copy member ID**.
- Add the ID to Vercel's environment variables as `SLACK_ADMIN_MEMBER_ID`.
