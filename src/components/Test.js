import { useAtom } from "jotai";
import React from "react";
import { testAtom } from "../App";
export const Test = () => {
  const [test, setTest] = useAtom(testAtom);

  return (
    <div>
      {test}
      <button
        onClick={() => {
          setTest("test from test");
        }}
      >
        Test
      </button>
    </div>
  );
};
