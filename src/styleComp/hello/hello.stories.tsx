import React from "react";
import Hello from "./hello";
import { boolean, withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import mdx from "./hello.mdx";

export default {
  title: "components/Hello",
  component: Hello,
  decorators: [withKnobs], // 애드온 적용
  parameters: {
    componentSubtitle: '"안녕하세요"라고 보여주는 컴포넌트',
    docs: {
      page: mdx,
    },
  },
};

export const hello = () => {
  const big = boolean("big", false);
  const name = text("name", "Storybook");
  return (
    <Hello
      name={name}
      big={big}
      onHello={action("onHello")}
      onBye={action("onBye")}
    />
  );
};

hello.story = {
  name: "Default",
};

export const standard = () => <Hello name="Storybook" />;
export const big = () => <Hello name="style-book" big />;

// const Primary = Template.bind({});
// Primary.args = {
//     variant: 'primary'
// }
