import { useMutation } from "react-query";
import { queryClient } from "..";
import { instance } from "../servers/axios";
import { IBoard } from "./BoardQuery";
import { Cards, ICard, ICards } from "./CardQuery";

export const useUpdateCards = (pjId: string) => {
  return useMutation(
    async (post: Cards) => {
      await instance.patch("api/buckets/cards", post);
    },
    /* optimistic update
    1. 현재 카드 이동시 이전 배열 형태가 잠깐 보였다가 수정되는 상황
    2. 깜박이는 현상을 제거하기 위해 해당 기술을 사용해야 한다고 판단
    3. update overwrite하지 않기 위해서 미리 취소
    4. 이동한 카드의 값을 찾기 위해 set으로 수정후 get으로 변경된 카드를 찾았음
    5. 이후에 Board에 존재하는 배열에 수정된 내용을 추가하고싶음
    */

    /**********************************깃허브 이슈 올려!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    {
      onMutate: (newData: ICards) => {
        const oldData = queryClient.getQueryData<ICard>(["getCard", newData.kbcId])?.data;
        const AllToDo = queryClient.getQueryData<IBoard>(["getBoard", pjId]);
        if (oldData?.kbbId !== newData.kbbId) {
          const OldfindToDo = AllToDo?.data.find((id) => id.kbbId === oldData?.kbbId);
          const OldfindToDoCards = OldfindToDo?.cards;
          OldfindToDoCards.splice(oldData?.position, 1);
          const NewfindToDo = AllToDo?.data.find((id) => id.kbbId === newData.kbbId);
          const NewfindToDoCards = NewfindToDo?.cards;
          NewfindToDoCards.splice(newData.position, 0, newData);
          queryClient.setQueryData(["getBoard", pjId], () => AllToDo);
        } else {
          if (oldData?.position === newData.position) {
            queryClient.setQueryData(["getBoard", pjId], () => AllToDo);
          } else {
            const findBucket = AllToDo?.data.find((id) => id.kbbId === oldData?.kbbId);
            const findBucketCards = findBucket?.cards;
            findBucketCards.splice(oldData?.position, 1);
            findBucketCards.splice(newData.position, 0, newData);
            queryClient.setQueryData(["getBoard", pjId], () => AllToDo);
          }
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["getBoard", pjId]);
      },
    }
  );
};
