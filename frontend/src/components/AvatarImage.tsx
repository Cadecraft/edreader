import './../App.css'

export default function AvatarImage(props: {avatarSrc: string | null}) {
  const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const BASE_AVATAR_URL = "https://static.us.edusercontent.com/avatars/";

  return (
        <img className="avatarimg" src={
          props.avatarSrc ? BASE_AVATAR_URL + props.avatarSrc : DEFAULT_AVATAR
        } />
  );
}
