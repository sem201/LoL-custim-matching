import { Props } from "../../../commonTypes";
import reset from "../../../assets/reset.svg";
import UserInfo from "./UserInfo";

const UserContainer = ({ children }: Props) => {
  return (
    <>
      <div className="w-[300px] bg-white border-2 border-[#C8AA6E] rounded-[15px] bg-opacity-15 mt-10">
        <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full mb-6 mt-5">
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-black">
            인원추가
          </button>
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold">
            모드선택
          </button>
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold">
            사용법
          </button>
        </div>
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        {children}
      </div>
      <button className="font-blackHanSans w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold mt-7">
        팀짜기
      </button>
      <button className="font-blackHanSans w-[30vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold mt-1 mb-7">
        <img src={reset} className="" />
        다시돌리기
      </button>
    </>
  );
};

export default UserContainer;
