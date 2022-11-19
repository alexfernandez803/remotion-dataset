import React from "react";
import { AbsoluteFill } from "remotion";
import data from "./creditsdata.json";
import { CreditsList } from "./components/AfterCreditList";

const Credits: React.FC = () => {
  return (
    <AbsoluteFill>
      <CreditsList credits={data} />
    </AbsoluteFill>
  )
}


export default Credits;