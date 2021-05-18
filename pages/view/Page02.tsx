import { Router, useRouter } from "next/router";
import { selectAuth } from "../../redux/feature/auth/index";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../redux/store";

import { NextPage } from "next";
import { addCount, selectCount } from "../../redux/feature/count/index";

export const getStaticProps = wrapper.getStaticProps((context) => {
  ({ preview }) => {
    console.log("2. Page.getStaticProps uses the sotre to dispatch things");
    //context.store.dispatch(keepTick("success to connecting redux on SSR"));
  };
});

const Page02: NextPage = () => {
  const dispatch = useDispatch();
  //const { tick } = useSelector(selectTick);
  const { countNumber } = useSelector(selectCount);
  console.log(useSelector(selectAuth));

  const router = useRouter();

  return (
    <div>
      <h1>Page02</h1>
      <button onClick={() => dispatch(addCount(countNumber))}>add count</button>
      <h3>{countNumber}</h3>
    </div>
  );
};

export default Page02;
