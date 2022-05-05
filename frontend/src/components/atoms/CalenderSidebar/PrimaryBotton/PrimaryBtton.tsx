import { memo, VFC } from "react";
import { Button } from "semantic-ui-react";

interface Props {
  children: string;
  onClick?: () => void;
}

export const PrimaryBotton: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <Button primary onClick={onClick}>
      {children}
    </Button>
  );
});
