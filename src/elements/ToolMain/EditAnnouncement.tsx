import React from "react";
import { queryClient } from "../..";
import {
  useDelAnnouncement,
  useUpdateAnnouncement,
} from "../../api/AnnouncementQuery";

interface propsType {
  dataID: number;
}

const EditAnnouncement = (prop: propsType) => {
  const { mutateAsync: DELAN } = useDelAnnouncement(prop.dataID);
  const { mutateAsync: UpdateAN } = useUpdateAnnouncement(prop.dataID);
  const onDelete = () => {
    DELAN().then(() => {
      queryClient.invalidateQueries("getAnnouncement");
    });
  };
  const onUpdate = () => {
    UpdateAN({
      id: prop.dataID,
      title: "수정완료",
    }).then(() => {
      queryClient.invalidateQueries("getAnnouncement");
    });
  };
  return (
    <div>
      <button onClick={onDelete}>삭제</button>
      <button onClick={onUpdate}>수정</button>
    </div>
  );
};

export default React.memo(EditAnnouncement);
