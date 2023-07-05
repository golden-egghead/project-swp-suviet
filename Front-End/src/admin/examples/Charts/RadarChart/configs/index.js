function configs(labels, datasets) {
	return {
		data: {
			labels,
			datasets: [...datasets]
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
