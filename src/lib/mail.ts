import formData from 'form-data'
import Mailgun from 'mailgun.js'
const mailgun = new Mailgun(formData);

const username = process.env.MAILGUN_USERNAME as string
const apiKey = process.env.MAILGUN_API_KEY as string
const domain = process.env.MAILGUN_DOMAIN as string

const mg = mailgun.client({username, key: apiKey});

type Message = {
  from: string
  to: string | string[]
  subject: string
  text?: string
  html?: string
}

export async function sendmail(message: Message) {
  return await mg.messages.create(domain, message)
}

export async function sendRegisterMail(code: string, email: string) {
  const message: Message = {
    from: 'support@yihao.dev',
    to: email,
    subject: `用户激活`,
    html: `<a href="http://localhost:3000/auth/activate?code=${code}">激活</a>`
  }
  await sendmail(message)
}