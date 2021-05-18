import { countAction, IcountProps } from "./count-slice";
import countReducer from "./count-slice";

export interface countState {
  count: IcountProps;
}

export const { addCount, disCount } = countAction;

export const selectCount = (state: countState) => state.count;

export default countReducer;
