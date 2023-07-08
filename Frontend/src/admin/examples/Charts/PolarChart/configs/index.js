/* eslint-disable no-dupe-keys */
// Material Dashboard 2 React base styles
import colors from '../../../../assets/theme/base/colors';

const { gradients, dark } = colors;

function configs(labels, datasets) {
	const backgroundColors = [];

	if (datasets.backgroundColors) {
		datasets.backgroundColors.forEach((color) =>
			gradients[color] ? backgroundColors.push(gradients[color].state) : backgroundColors.push(dark.main)
		);
	} else {
		backgroundColors.push(dark.main);
	}

	return {
		data: {
			labels,
			datasets: [
				{
					label: datasets.label,
					backgroundColor: backgroundColors,
					data: datasets.data
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				}
			},
			interaction: {
				intersect: false,
				mode: 'index'
			}
		}
	};
}

export default configs;
