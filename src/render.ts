import path from "path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import { Credit } from "./Credits/types";
import json from "./Credits/creditsdata.json"


const renderOne = async (credit: Credit, bundleLocation: string, compositionId: string, entry: String) => {
    // Parametrize the video by passing arbitrary props to your component.

    // Extract all the compositions you have defined in your project
    // from the webpack bundle.
    const comps = await getCompositions(bundleLocation, {
        // You can pass custom input props that you can retrieve using getInputProps()
        // in the composition list. Use this if you want to dynamically set the duration or
        // dimensions of the video.
        inputProps: credit,
    });

    // Select the composition you want to render.
    const composition = comps.find((c) => c.id === compositionId);

    // Ensure the composition exists
    if (!composition) {
        throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
    }

    const outputLocation = `out/${credit.name}.mp4`;
    console.log("Attempting to render:", outputLocation);
    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation,
        inputProps: credit,
    });
    console.log("Render done!");
}


const start = async () => {

    // The composition you want to render
    const compositionId = "CreditItem";

    // You only have to do this once, you can reuse the bundle.
    const entry = "src/index.ts";
    console.log("Creating a Webpack bundle of the video");


    const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
        // If you have a Webpack override, make sure to add it here
        webpackOverride: (config) => config,

    });


    json.forEach(async element => {
        const singleCredit = { ...element, isSingle: true }
        await renderOne(singleCredit, bundleLocation, compositionId, entry);

    });
    console.log("render all");

}

start();