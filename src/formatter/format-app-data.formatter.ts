import { UserProfileResponse } from "../types/app.user.type"

export function formatAppUserProfile(data: any): UserProfileResponse {
  const formattedData = {
    id: data.id,
    username: data.username,
    email: data.email,
    phone: data.phone,
    country: data.country,
    currency: data.currency_id,
    profile_image_url: data.profile_image_url,
    avatar_url: data.avatar_url,
    balance: {
      cash_balance: data.balance.cash_balance,
      coin_balance: data.balance.coin_balance
    },
    tier: data.tier_statuses.length === 0 ? null : {
      id: data.tier_statuses[0].tier.id,
      name: data.tier_statuses[0].tier.name
    }
  }

  return formattedData
}

export function formatLoginAppUserData(data: any): UserProfileResponse {
  const formattedData = {
    id: data.id,
    username: data.username,
    email: data.email,
    phone: data.phone,
    country: data.country,
    currency: data.currency_id,
    profile_image_url: data.profile_image_url,
    avatar_url: data.avatar_url,
    status: data.status,
    guest: data.guest,
    createdAt: data.createdAt,
    balance: {
      cash_balance: data.balance.cash_balance,
      coin_balance: data.balance.coin_balance
    },
    tier: data.tier_statuses.length === 0 ? null : {
      id: data.tier_statuses[0].tier.id,
      name: data.tier_statuses[0].tier.name
    }
  }

  return formattedData
}