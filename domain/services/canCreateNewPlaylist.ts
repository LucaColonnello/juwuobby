import type { User } from "../../types";

export default function canCreateNewPlaylist(user: User) {
  return user.email !== null;
}
