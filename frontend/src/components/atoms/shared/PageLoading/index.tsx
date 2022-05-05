import { memo, VFC } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const PageLoading: VFC = memo((props) => {
  return (
    <Dimmer active inverted>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
});
