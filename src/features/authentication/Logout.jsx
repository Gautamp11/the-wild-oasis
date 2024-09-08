import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/SpinnerMini";

function Logout() {
  const { isLoading, logout } = useLogout();
  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  if (isLoading) return <Spinner />;
  return (
    <ButtonIcon onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
