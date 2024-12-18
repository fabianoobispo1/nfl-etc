import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

// Schema para usuários
export const userSchema = {
  nome: v.string(),
  email: v.string(),
  provider: v.string(),
  role: v.union(v.literal('admin'), v.literal('user')),
  image: v.optional(v.string()),
  image_key: v.optional(v.string()),
  password: v.string(),
  data_nascimento: v.optional(v.number()), // Timestamp
}

export default defineSchema({
  user: defineTable(userSchema)
    .index('by_email', ['email'])
    .index('by_username', ['nome']),
})
