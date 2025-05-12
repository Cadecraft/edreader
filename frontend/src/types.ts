// Types (to be compatible with the backend API)

/** The current signed-in user */
export type User = {
  name: string,
  avatar: string | null,
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

export type ThreadUser = {
  id: number,
  role: string,
  name: string,
  avatar: string | null,
  course_role: string
}

export type ThreadUserMap = Map<number, ThreadUser>;

export type Thread = {
  id: number,
  user_id: number,
  course_id: number,
  original_id: number | null, // Original thread??
  editor_id: number | null, // Editor??
  accepted_id: number | null, // Unsure
  duplicate_id: number | null,
  number: number, // The actual user-facing number identifier of the post
  type: string,
  title: string,
  content: string, // XML content
  document: string, // Text?
  category: string, // Such as "Labs" or "Projects"
  subcategory: string,
  subsubcategory: string,
  flag_count: number,
  star_count: number,
  view_count: number, // Valuable
  unique_view_count: number,
  vote_count: number,
  reply_count: number,
  unresolved_count: number,
  is_locked: boolean,
  is_pinned: boolean,
  is_private: boolean,
  is_endorsed: boolean,
  is_answered: boolean,
  is_student_answered: boolean,
  is_staff_answered: boolean,
  is_archived: boolean,
  is_anonymous: boolean,
  is_megathread: boolean,
  anonymous_comments: boolean,
  approved_status: string,
  created_at: string,
  updated_at: string | null,
  deleted_at: string | null,
  pinned_at: string | null,
  anonymous_id: number,
  vote: number,
  is_seen: boolean,
  is_starred: boolean,
  glanced_at: string,
  new_reply_count: number,
  user: ThreadUser | null
}

export type Answer = {
  id: number,
  user_id: number,
  course_id: number,
  thread_id: number,
  original_id: number | null,
  parent_id: number | null,
  editor_id: number | null,
  number: number,
  type: string,
  kind: string,
  content: string, // XML
  document: string,
  flag_count: number,
  vote_count: number,
  is_endorsed: boolean,
  is_anonymous: boolean,
  is_private: boolean,
  is_resolved: boolean,
  created_at: string,
  updated_at: string | null,
  deleted_at: string | null,
  anonymous_id: number,
  vote: number,
  comments: ThreadComment[]
}

export type ThreadComment = Answer;

export type ThreadDetails = {
  answers: Answer[],
  comments: ThreadComment[]
}
