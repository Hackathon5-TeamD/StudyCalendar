import React, { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Memo } from "../../../types/Memo";

interface Props {
  memoData: Memo | undefined;
  setMemoData: React.Dispatch<React.SetStateAction<Memo>>;
}

export const MarkdownEditor = (props: Props) => {
  const { memoData, setMemoData } = props;

  const onChange = (value: any) => {
    setMemoData((state) => ({ ...state, memo_txt: value }));
  };

  return <SimpleMde value={memoData?.memo_txt} onChange={onChange} />;
};
