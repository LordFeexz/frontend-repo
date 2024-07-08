import type { Reducer } from "redux";
import { GET_USER, UPDATE_USER } from "./action";
import type { IUser } from "@/interfaces/entities";

export interface InitialState {
  datas: IUser[];
}

export type Action =
  | {
      type: typeof GET_USER;
      data: IUser[];
    }
  | {
      type: typeof UPDATE_USER;
      data: IUser;
    };

const initialState: InitialState = {
  datas: [],
};

const reducer: Reducer<InitialState, Action> = (
  state: InitialState = initialState,
  action: Action
) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        datas: [
          ...state.datas,
          ...action.data.filter(
            (newItem: IUser) =>
              !state.datas.some(
                (existingItem: IUser) =>
                  existingItem.id === newItem.id ||
                  existingItem.email === newItem.email
              )
          ),
        ],
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        datas: state.datas.map((item: IUser) =>
          item.id === action.data.id ? action.data : item
        ),
      };
    }
    default:
      return state;
  }
};

export default reducer;
