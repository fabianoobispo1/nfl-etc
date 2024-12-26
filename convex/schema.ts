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

// Schema para bio tela inicial
export const bioTelainicialSchema = {
  bio: v.string(),
  ordem: v.string(),
}
// Schema para lista de apresentadores
export const apresentadoresSchema = {
  nome: v.string(),
  bio: v.string(),
  image: v.optional(v.string()),
  image_key: v.optional(v.string()),
  ordem: v.string(),
  link_instagram: v.string(),
}

export default defineSchema({
  user: defineTable(userSchema)
    .index('by_email', ['email'])
    .index('by_username', ['nome']),
  bioTelainicial: defineTable(bioTelainicialSchema).index('by_ordem', [
    'ordem',
  ]),
  apresentadores: defineTable(apresentadoresSchema)
    .index('by_ordem', ['ordem'])
    .index('by_nome', ['nome']),
})
