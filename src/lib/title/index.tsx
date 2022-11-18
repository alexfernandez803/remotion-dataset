import React from "react";
import { AbsoluteFill, Series } from "remotion";

import { BACKGROUND } from "../utils";

import { Like } from "./Like";

export const LikeAndSubscribe: React.FC = () => {
  return (
    <AbsoluteFill style={{

    }}>
      <Series>
        <Series.Sequence durationInFrames={100}>
          <Like />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
