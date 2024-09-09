import styled from "styled-components";
import { useUser } from "../authentication/useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();

  let fullName = "";
  let avatar = "";

  if (
    user &&
    user.user_metadata &&
    Object.keys(user.user_metadata).length > 0
  ) {
    fullName = user.user_metadata.full_name || "";
    avatar = user.user_metadata.avatar_url || "";
  }

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName.length > 0 ? fullName : user?.email}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
