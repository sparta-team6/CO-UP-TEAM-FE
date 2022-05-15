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
      pjId: roomData?.pjId,
      thumbnail: String(roomData?.thumbnail),
      title: String(roomData?.title),
      summary: String(roomData?.summary),
      inviteCode: roomData?.inviteCode,
    });
  };
  const { mutateAsync } = useLogOut();
  const onLouout = () => {
    mutateAsync().then((res) => console.log(res));
  };
  return (
    <div className="w-12 h-full flex flex-col justify-between items-center bg-slate-500 sm:h-[calc(100vh-80px)] sm:pt-12">
      <div>
        {data?.data.map((room, index) => (
          <div onClick={() => onClick(room.pjId)} key={index}>
            <img className="w-10 h-10 rounded-lg mt-2" src={room.thumbnail} alt="" />
          </div>
        ))}
      </div>
      <div className="w-12 h-24">
        <span>다크모드</span>
        <span>나가기</span>
        <span onClick={onLouout}>로그아웃</span>
      </div>
    </div>
  );
};

export default MyProjectList;
