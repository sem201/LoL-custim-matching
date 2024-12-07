import TeamContainer from "../components/Mobile/Main/TeamContainer";
import UserContainer from "../components/Mobile/chooseUser/UserContainer";

const MobileMainpage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-[100vw] max-h-[100vh] overflow-y-scroll">
      <UserContainer />
      <TeamContainer color="RED" />
      <TeamContainer color="BLUE" />
    </div>
  );
};

export default MobileMainpage;
