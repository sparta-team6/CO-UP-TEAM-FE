import axios from "axios";
import { useMutation } from "react-query";

interface Board {
  pjId: string;
  title: string;
  position: number;
}

// interface IBoard {
//   data: Board[];
// }

export const useGetBoard = () => {
  return useMutation("getBoard", (post: Board) => {
    return axios.post("http://3.36.77.250/api/buckets/", post);
  });
};
