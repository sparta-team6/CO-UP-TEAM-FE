import { useMutation } from "react-query";
import { queryClient } from "..";
import { instance } from "../servers/axios";
import { Cards } from "./CardQuery";

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
    {
      // onMutate: async (newData: ICards) => {
      //   queryClient.cancelQueries(["getBoard", pjId]);
      //   queryClient.setQueryData(["getCard", newData.kbcId], newData);
      //   const toDo = queryClient.getQueryData(["getCard", newData.kbcId]);
      //   queryClient.setQueryData(["getBoard", pjId], (old: any) => {
      //     return { ...old.data, cards: [...old.data.cards, toDo] };
      //   });
      // },
      onSettled: () => queryClient.invalidateQueries(["getBoard", pjId]),
    }
  );
};