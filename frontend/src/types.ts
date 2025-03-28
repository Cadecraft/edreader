// Types (to be compatible with the backend API)

export type User = {
  name: string,
  avatar: string,
  email: string,
  username: string
};

export type Course = {
  course: {
    id: number,
    realm_id: number,
    code: string,
    name: string,
    year: string,
    session: string,
    status: string,
    features: {
      analytics: boolean,
      discussion: boolean
    },
    settings: {
      theme: {
        logo: string,
        background: string,
        foreground: string
      }
    },
    created_at: string
  },
  role: {
    role: string
  },
  last_active: string
}
