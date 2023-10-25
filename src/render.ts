import path from 'path';
import {bundle} from '@remotion/bundler';
import {selectComposition, renderMedia} from '@remotion/renderer';
import {AfterCreditType} from './AfterCredits/types';
import json from './AfterCredits/creditsdata.json';

const renderOne = async (
	credit: AfterCreditType,
	bundleLocation: string,
	compositionId: string
) => {
	// Parametrize the video by passing arbitrary props to your component.

	// Extract all the compositions you have defined in your project
	// from the webpack bundle.
	const composition = await selectComposition({
		// You can pass custom input props that you can retrieve using getInputProps()
		// in the composition list. Use this if you want to dynamically set the duration or
		// dimensions of the video.
		serveUrl: bundleLocation,
		inputProps: credit,
		id: compositionId,
	});

	const outputLocation = `out/${credit.name}.mp4`;
	console.log('Attempting to render:', outputLocation);
	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: 'h264',
		outputLocation,
		inputProps: credit,
	});
	console.log('Render done!');
};

const start = async () => {
	// The composition you want to render
	const compositionId = 'AfterCreditItem';

	// You only have to do this once, you can reuse the bundle.
	const entry = 'src/index.ts';
	console.log('Creating a Webpack bundle of the video');

	const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
		// If you have a Webpack override, make sure to add it here
		webpackOverride: (config) => config,
	});

	for (const element of json) {
		const singleCredit = {...element, isSingle: true};
		await renderOne(singleCredit, bundleLocation, compositionId);
	}
	console.log('All compositions rendered.');
};

start()
	.then(() => {
		console.log('Render Started.');
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
