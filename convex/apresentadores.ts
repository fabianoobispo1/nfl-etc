import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { apresentadoresSchema } from './schema'

export const create = mutation({
  args: apresentadoresSchema,
  handler: async ({ db }, args) => {
    const apresentadores = await db.insert('apresentadores', args)
    return apresentadores
  },
})

export const getByNome = query({
  args: {
    nome: v.string(),
  },
  handler: async ({ db }, { nome }) => {
    const apresentadores = await db
      .query('apresentadores')
      .withIndex('by_nome', (q) => q.eq('nome', nome))
      .unique()
    return apresentadores
  },
})

export const getById = query({
  args: {
    apresentadoresId: v.id('apresentadores'),
  },
  handler: async ({ db }, { apresentadoresId }) => {
    const apresentadores = await db
      .query('apresentadores')
      .withIndex('by_id', (q) => q.eq('_id', apresentadoresId))
      .unique()
    return apresentadores
  },
})

export const Updateapresentadores = mutation({
  args: {
    apresentadoresId: v.id('apresentadores'),
    nome: v.optional(v.string()),
    bio: v.optional(v.string()),
    image: v.optional(v.string()),
    image_key: v.optional(v.string()),
    ordem: v.optional(v.string()),
    link_instagram: v.optional(v.string()),
  },
  handler: async (
    { db },
    { apresentadoresId, nome, bio, image, ordem, image_key, link_instagram },
  ) => {
    // Buscar o apresentador atual
    const apresentador = await db.get(apresentadoresId)
    if (!apresentador) {
      throw new Error('apresentador não encontrado')
    }

    // altera os valores
    const updateapresentadores = await db.patch(apresentadoresId, {
      nome,
      bio,
      image,
      ordem,
      image_key,
      link_instagram,
    })

    return updateapresentadores
  },
})
