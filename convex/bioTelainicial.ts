import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { bioTelainicialSchema } from './schema'

export const create = mutation({
  args: bioTelainicialSchema,
  handler: async ({ db }, args) => {
    const bioTelainicial = await db.insert('bioTelainicial', args)
    return bioTelainicial
  },
})

export const getById = query({
  args: {
    bioTelainicialId: v.id('bioTelainicial'),
  },
  handler: async ({ db }, { bioTelainicialId }) => {
    const bioTelainicial = await db
      .query('bioTelainicial')
      .withIndex('by_id', (q) => q.eq('_id', bioTelainicialId))
      .unique()
    return bioTelainicial
  },
})

export const UpdatebioTelainicial = mutation({
  args: {
    bioTelainicialId: v.id('bioTelainicial'),
    bio: v.optional(v.string()),
  },
  handler: async ({ db }, { bioTelainicialId, bio }) => {
    const updatebioTelainicial = await db.patch(bioTelainicialId, {
      bio,
    })

    return updatebioTelainicial
  },
})

export const getAllbioTelainicialRole = query({
  handler: async ({ db }) => {
    const bioTelainicial = await db.query('bioTelainicial').collect()

    return bioTelainicial
  },
})

export const remove = mutation({
  args: {
    bioId: v.id('bioTelainicial'),
  },
  handler: async ({ db }, { bioId }) => {
    const Bio = await db.get(bioId)
    if (!Bio) {
      throw new Error('Bio não encontrado')
    }

    await db.delete(bioId)

    return { success: true, message: 'Bio removida com sucesso' }
  },
})
