import { Router, useRouter } from "next/router";
import { selectAuth } from "../../redux/feature/auth/index";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../redux/store";

import { NextPage } from "next";
import { addCount, selectCount } from "../../redux/feature/count/index";

export const getStaticProps = wrapper.getStaticProps((context) => {
  ({ preview }) => {
    console.log("2. Page.getStaticProps uses the sotre to dispatch things");
    //context.store.dispatch(keepTick("success to connecting redux on SSR"));
  };
});

const ReadData: NextPage = () => {
  const dispatch = useDispatch();
  //const authValue = useSelector(selectAuth);
  //const { countNumber } = useSelector(selectCount);

  const router = useRouter();

  return (
    <div className="container">
      <h1>ReadData</h1>
      {/* <button onClick={() => dispatch(addCount(countNumber))}>add count</button>
      <h3>{countNumber}</h3> */}
    </div>
  );
};

export default ReadData;
