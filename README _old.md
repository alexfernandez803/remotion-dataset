# Remotion Intro Video

---
id: dataset
title: JSON dataset with Remotion
---

Example usage of a Dataset or sets of record in Remotion. The dataset is a collection of package or tutorial links information.


## Completed video with all after credits 

https://user-images.githubusercontent.com/7582277/202846276-b0254ba6-b052-4972-957d-a16ed33af884.mp4


## Individual after credit
https://user-images.githubusercontent.com/7582277/202846306-bc6ea465-e7e9-4d33-b8e6-655cf09eb4d4.mp4

https://user-images.githubusercontent.com/7582277/202846310-2afe9cc3-3c3b-4c74-b762-aa85e28fe36f.mp4

## This assumes that you already bootstrapped you're remotion project


## Creating a JSON structure

Let's start a simple json record that represents data that needs to automatically animated.
The record contains bill of materials or credits to project that is used to create a remotion video, in movies an after credits.

## Sample json record

Record that is installed in the npm project

```json
  {
    "name": "React",
    "source_type": "npm",
    "metadata": {
      "project_url": "https://reactjs.org/"
    }
  }
```
Another record that serve as 

```json
  {
    "name": "Remotion Fireship",
    "source_type": "github",
    "metadata": {
      "project_url": "https://github.com/wcandillon/remotion-fireship"
    }
  }
```

## Represent the data as an structure in React

```tsx twoslash
  import data from "./creditsdata.json";
```

## Main remotion composition

```tsx twoslash
  import React from "react";
  import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
  import { BACKGROUND } from "../../lib/utils";
  import CreditItem from "./CreditItem";
  import CreditTitle from "./CreditsTitle";
  import { Credit } from "../types";


  const CreditsList: React.FC<{
    credits: Array<Credit>
  }> = ({
    credits
  }) => {
      const frame = useCurrentFrame();

      const value = interpolate(frame, [1, (credits.length - 1) * 4], [0, credits.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })

      const theCredits = credits.slice(0, value);

      return (
        <AbsoluteFill style={{
          display: 'flex',
          background: BACKGROUND,
          padding: '50px',
        }}>
          <CreditTitle />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: BACKGROUND,
            padding: '50px',
            justifyContent: 'center',
            justifyItems: 'center',
            flexFlow: 'wrap',
          }}>
            {theCredits.map((item, index) => <CreditItem key={`${item.name}-${index}`} {...item} />)}
          </div>
        </AbsoluteFill>

      )
    }

  export { CreditsList }

```

The `value` represents the iteration of `credits`, from frame 1 to n(number of items) will give us where we at the iteration. This will give us an effect that items are being slowly added in the page.

`credits.slice(0, value);` will combine the array item, one a time

```
  <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: BACKGROUND,
            padding: '50px',
            justifyContent: 'center',
            justifyItems: 'center',
            flexFlow: 'wrap',
          }}>
          ....
```

The container of the items is configured with flexbox layout with `flexFlow` as `wrap` so when the items don't fit the `width` of the container it will automatically go down.


``` tsx twoslash
   {theCredits.map((item, index) => <CreditItem key={`${item.name}-${index}`} {...item} />)}

```
While new items are being slowly added in `theCredits` main component will be updated.

## Individual Credit items

Individual item of credit has it's own animation 

``` tsx twoslash
  import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import Description from "./Description";
import SourceType from "./SourceType";
import { Credit } from "../types";

const CreditItem: React.FC<Credit> = ({ name, source_type, metadata }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame + 10,
    durationInFrames: 25,
    config: {
      damping: 100
    }
  });


  return (
    <div style={{
      transform: `scale(${scale})`,
      backgroundColor: "white",
      height: '100px',
      margin: '10px',
      display: 'flex',
      paddingLeft: 50,
      paddingRight: 50,
      fontFamily: "Cubano",
      fontWeight: "bold",
      fontSize: '50px',
      borderRadius: '20px',
      justifyItems: 'center',
      alignItems: 'center',


    }}>
      <SourceType sourceType={source_type} />
      <Description name={name} metadata={metadata} />
    </div>


  )
}
export default CreditItem;
```

The `scale` spring value just resizes the component for an added effect when it is added in the `div` component.


## The Description

The description component contains the `name` of the `credit` item and `metadata.project_url`.
The `name` will be shown first then followed by `project_url`.

```tsx twoslash
import { interpolate, useCurrentFrame } from "remotion";
import { Metadata } from "../types"

const Description: React.FC<{
  name: string,
  metadata: Metadata
}> = ({ name, metadata }) => {
  const frame = useCurrentFrame();
  const moveY = interpolate(
    frame,
    [20, 30],
    [10, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  const opacity = interpolate(
    frame,
    [50, 100],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: '40px',
        transform: `translateY(${moveY}px)`
      }}>
        {name}
      </div>

      <div style={{
        fontSize: '20px',
        opacity: `${opacity}`,
        fontFamily: 'Arial'
      }}>
        {metadata.project_url}
      </div>

    </div>

  )
}

export default Description;
```
The `name`'s `div` container will be positioned in place of `{metadata.project_url}` `div` container, then will move up based on `moveY` value. After that on `opacity` between frame `50 to 100` the `project_url` will slowly show.


## Extra - Icons based on source type

This are svg icons retrieved from icon's respective website, source can be either github or npm.

```tsx twoslash
  import { SourceType } from "../types";

  const SourceTypeElem: React.FC<{
    sourceType: SourceType
  }> = ({ sourceType }) => {
    if (sourceType === 'github') {
      return (
        <svg height="64" viewBox="0 0 16 16" version="1.1" width="64"  >
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>

      )
    }

    if (sourceType === 'npm') {
      return (
        <svg fill="red" height="64" width="64" viewBox="0 0 780 250"><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>
      )
    }

    return <></>
  }

  const SourceTypeElemMain: React.FC<{
    sourceType: SourceType
  }> = ({ sourceType }) => {
    return <div style={{
      paddingTop: '10px',
      paddingLeft: '0px',
      paddingRight: '30px',
      display: 'flex',
    }}>
      <SourceTypeElem sourceType={sourceType} />
    </div>
  }

  export default SourceTypeElemMain;
```
