import { Composition } from 'remotion';
import Credits from './AfterCredits';
import CreditItem from './AfterCredits/components/AfterCreditItem';

import { getFont } from "./lib/load-font";
getFont();
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="Main"
				component={Credits}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}

			/>

			<Composition
				id="AfterCreditItem"
				component={CreditItem}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={
					{
						"name": "React",
						"source_type": "npm",
						"metadata": {
							"project_url": "https://reactjs.org/"
						}
					}
				}

			/>


			<Composition
				id="AfterCreditItemSingle"
				component={CreditItem}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={
					{
						"name": "React",
						"source_type": "npm",
						"metadata": {
							"project_url": "https://reactjs.org/"
						},
						"isSingle": true
					}
				}

			/>

		</>
	);
};
