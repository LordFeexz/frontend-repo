import type { Reducer } from "redux";
import { GET_USER } from "./action";
import type { IUser } from "@/interfaces/entities";

export interface InitialState {
  datas: IUser[];
}

export type Action = {
  type: typeof GET_USER;
  data: IUser[];
};

const initialState: InitialState = {
  datas: [],
};

const reducer: Reducer<InitialState, Action> = (
  state: InitialState = initialState,
  action: Action
) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        datas: (action.data as IUser[]).reduce(
          (acc, curr) => {
            if (
              acc.some(
                (el) =>
                  el.email === curr.email ||
                  el.id === curr.id ||
                  el.name === curr.name
              )
            )
              acc.push(curr);
            return acc;
          },
          [...state.datas]
        ),
      };
    default:
      return state;
  }
};

export default reducer;
