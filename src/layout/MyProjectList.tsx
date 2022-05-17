import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useGetRoom } from "../api/ProjectQuery";
import { useLogOut } from "../api/UserQuery";
import { HandleOpen, ProjectKey } from "../recoil/Atoms";

const MyProjectList = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  const setProject = useSetRecoilState(ProjectKey);
  const navigate = useNavigate();
  const { data } = useGetRoom();
  const onClick = (roomID?: string) => {
    navigate(`/tool/${roomID}`);
    setOpen(false);
    const roomData = data?.data.find((r) => r.pjId === roomID);
    setProject({
      pjId: String(roomData?.pjId),
      thumbnail: String(roomData?.thumbnail),
      title: String(roomData?.title),
      summary: String(roomData?.summary),
      inviteCode: String(roomData?.inviteCode),
    });
  };
  const { mutateAsync } = useLogOut();
  const onLouout = () => {
    mutateAsync().then((res) => console.log(res));
  };
  return (
    <div className="w-[74px] h-[calc(100%-3rem)] bg-zinc-300 flex flex-col justify-between items-center sm:h-[calc(100vh-80px)] sm:pt-12">
      <div className="mt-2">
        {data?.data.map((room, index) => (
          <div onClick={() => onClick(room.pjId)} key={index}>
            <img className="w-[46px] h-[46px] rounded-lg mt-2" src={room.thumbnail} alt="" />
          </div>
        ))}
      </div>
      <div className="w-12 h-36 flex flex-col justify-between">
        <span>다크모드</span>
        <span>나가기</span>
        <span onClick={onLouout}>로그아웃</span>
      </div>
    </div>
  );
};

export default MyProjectList;
