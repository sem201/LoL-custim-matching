import { useState } from "react";
import apiCall from "../../Api/Api";

// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
  setIsUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUserModal({
  isModalOpen,
  closeModal,
  setIsUserAdded,
}: ModalProps) {
  const [nicknameTag, setNicknameTag] = useState<string>(""); // 입력값
  const [userAdded, setUserAdded] = useState<boolean | null>(null); // 검색 결과
  const [errorLog, setErrorLog] = useState<string>(""); // 검색 결과 에러로그

  // 추가 버튼 활성화 상태
  const isAddEnabled = userAdded === true;

  const handleAddUser = async () => {
    const trimmedInput = nicknameTag.trim(); // 공백 제거
    const nicknameTagRegex = /^[^#]+#[^#]+$/; // 정규식: 닉네임#태그 형태
    if (!nicknameTagRegex.test(trimmedInput)) {
      setUserAdded(false); // 유효성 실패
      setErrorLog("올바른 형식으로 입력해주세요 \n ex) Hide on bush#kr1");
      return;
    }

    // 입력값 분리
    const [nickname, tag] = nicknameTag.split("#");

    // 태그를 대문자로 변환
    // const normalizedTag = tag.toUpperCase();

    // 검색 로직 실행
    const data = { userid: nickname, tagLine: tag };
    try {
      await apiCall("/noobs/lolUser", "get", data);
      setErrorLog("");
      setUserAdded(true);
    } catch (error: any) {
      if (error.status === 404) {
        setErrorLog(
          "등록된 소환사를 찾을 수 없습니다. \n 소환사 이름을 확인해주세요."
        );
      } else if (error.status === 403) {
        setErrorLog(
          "서버 인증이 만료되었습니다. \n 잠시 후 다시 시도해주세요."
        );
      } else {
        setErrorLog(
          "서버에 문제가 발생했습니다. \n 잠시 후 다시 시도해주세요."
        );
      }
      setUserAdded(false);
    }

    // 유저 추가 로직 (닉네임은 그대로, 태그는 대문자로 비교)
  };

  const handleAddButtonClick = async () => {
    const [nickname, tag] = nicknameTag.split("#");
    const data = { userid: nickname, tagLine: tag };
    try {
      await apiCall("noobs/lolUserAdd", "post", data);
      setIsUserAdded((prev) => !prev);
    } catch (error: any) {
      if (
        error.status === 400 &&
        error.response.data.message === "이미 추가된 유저입니다. "
      ) {
        alert("이미 추가된 유저입니다.");
      } else if (
        error.status === 400 &&
        error.response.data.message === "더이상 추가 할 수 없습니다."
      ) {
        alert(
          "더 이상 추가할 수 없습니다.\n 함께한 사용자는 최대 15명 까지 추가할 수 있습니다."
        );
      } else if (error.status === 403) {
        alert("서버 인증이 만료되었습니다. \n 잠시 후 다시 시도해주세요.");
        alert(errorLog);
      } else {
        alert("서버에 문제가 발생했습니다. \n 잠시 후 다시 시도해주세요.");
        alert(errorLog);
      }
    }
    // 추가 버튼 클릭 시 초기화
    setNicknameTag(""); // 입력 필드 초기화
    setUserAdded(null); // 유저 추가 완료/실패 문구 초기화
  };

  const handleCloseButtonClick = () => {
    // 닫기 버튼 클릭 시 초기화
    setNicknameTag(""); // 입력 필드 초기화
    setUserAdded(null); // 유저 추가 완료/실패 문구 초기화
    closeModal();
  };

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          className="bg-{#ffffff} p-3 rounded-lg w-[350px] shadow-lg border-4"
          style={{ borderColor: "#C89B3C" }}
        >
          <p
            className="text-center mb-7 font-bold text-sm whitespace-nowrap font-blackHanSans text-wrap"
            style={{ fontFamily: "Arial, sans-serif", color: "#0F2041" }}
          >
            추가할 유저의 닉네임과 태그를 입력하세요.
          </p>

          {/* Input + 검색 버튼 */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={nicknameTag}
              onChange={(e) => setNicknameTag(e.target.value)}
              placeholder="예: 닉네임#KR1234"
              className="flex-1 px-3 py-2 text-[#0F2041] border border-[#C89B3C] rounded-lg bg-[#F0E6D2] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-[#C89B3C] text-white rounded-lg hover:bg-[#A87F2D] font-blackHanSans"
            >
              검색
            </button>
          </div>

          {/* 추가 완료/실패 문구 */}
          {userAdded === true && (
            <span className="block text-green-500 text-sm mb-4 text-center ">
              유저 검색 완료
            </span>
          )}
          {userAdded === false && (
            <span className="block text-red-500 text-sm mb-4 text-center whitespace-pre-line">
              {errorLog}
            </span>
          )}

          {/* 닫기 + 추가 버튼 */}
          <div className="flex justify-center gap-4 mt-10 font-blackHanSans">
            <button
              disabled={!isAddEnabled} // 검색 성공 시 활성화
              onClick={handleAddButtonClick} // 추가 버튼 클릭 시 초기화
              className={`px-7 py-2 ${
                isAddEnabled
                  ? "bg-[#C89B3C] text-white border-[#F0E6D2] font-bold cursor-not-allowed"
                  : "bg-[#F0E6D2] text-[#0F2041] font-bold hover:bg-[#A87F2D]"
              } border-2 border-[#C89B3C] rounded-full`}
            >
              추가
            </button>
            <button
              onClick={handleCloseButtonClick}
              className="px-7 py-2 bg-[#F0E6D2] text-[#0F2041] font-bold border-2 border-[#C89B3C] rounded-full hover:bg-[#e8d9c3]"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  );
}
