import { useMutation } from "react-query";
import { queryClient } from "..";
import { instance } from "../servers/axios";
import { IBoard } from "./BoardQuery";
import { Cards, ICard, ICards } from "./CardQuery";

// 카드 이동 낙관적 업데이트로 UI를 먼저 보여주고 api 요청 허용/롤백 결정
export const useUpdateCards = (pjId: string) => {
  return useMutation(
    async (post: Cards) => {
      await instance.patch("api/buckets/cards", post);
    },
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
