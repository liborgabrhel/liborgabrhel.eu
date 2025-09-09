import type { Via } from './_types'

export const INTRO_PARAGRAPH: Record<Via, string> = {
  beekeeper:
    "I'd be glad to hear from you about beekeeping — whether you have questions, want to exchange experiences, or simply share a bit of bee talk. You can reach me directly at the email below.",
  default:
    "I'd be glad to hear from you — whether you have web development questions, want to discuss a project, or simply have beekeeping questions to share. You can reach me directly at the email below.",
  developer:
    "I'd be glad to hear from you about web development — whether you have questions, want to discuss a project, or just want to connect with a fellow frontend developer. You can reach me directly at the email below.",
}

export const MAIL_SUBJECT: Record<Via, string> = {
  beekeeper: '[liborgabrhel.eu] – Beekeeping',
  default: '[liborgabrhel.eu] – General',
  developer: '[liborgabrhel.eu] – Frontend Development',
}

export const MAIL_BODY: Record<Via, string> = {
  beekeeper: `Hi Libor,

I’d like to get in touch regarding beekeeping.

[Write your message here.]

Best,
[Your name]`,
  default: `Hi Libor,

I’d like to get in touch.

[Write your message here.]

Best,
[Your name]`,
  developer: `Hi Libor,

I’d like to get in touch regarding frontend development.

[Write your message here.]

Best,
[Your name]`,
}
