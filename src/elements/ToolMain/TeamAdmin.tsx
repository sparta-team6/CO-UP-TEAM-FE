import { User } from "../../api/UserQuery";
import imgCrown from "../../images/img_crown.png";

const TeamAdmin = ({ profileImage, nickname, aboutMe, url }: User) => {
  return (
    <div className="group w-full mt-[20px] relative flex items-center space-x-2">
      <img className="absolute -top-1 left-6" src={imgCrown} alt="" />
      <img className="rounded-full m-0" width={36} height={36} src={profileImage} alt="" />
      <span className="font-semibold dark:text-white">{nickname}</span>
      <div className="sm:left-[-30%] sm:top-[-300px] hidden w-[334px] min-h-[120px] sm:z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] top-[-80px] rounded-lg shadow-md">
        <div className="w-full h-full px-[20px] py-[13px] flex flex-col">
          <div className="w-full h-full flex">
            <div className="h-full flex items-center span">
              <img className="rounded-full" width={36} height={36} src={profileImage} alt="" />
            </div>
            <div className="flex flex-col w-full h-full pl-[14px] pt-[14px]">
              <span className="font-semibold ">{nickname}</span>
              <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">{aboutMe}</span>
              <a href={url} target="_blank" className="text-xs text-8 dark:text-2" rel="noreferrer">
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAdmin;
