import { useMemo } from 'react';

// porp-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-chartjs-2 components
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';

// PieChart configurations
import configs from './configs';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ title, description, height, chart }) {
	const { data, options } = configs(chart.labels || [], chart.datasets || {});
	console.log(data);
	const renderChart = (
		<MDBox py={2} pr={2} pl={2}>
			{title || description ? (
				<MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
					<MDBox mt={0}>{title && <MDTypography variant="h6">{title}</MDTypography>}</MDBox>
				</MDBox>
			) : null}
			{useMemo(
				() => (
					<MDBox height={height}>
						<MDTypography
							component="div"
							variant="button"
							color="text"
							style={{ display: 'flex', justifyContent: 'space-between' }}
						>
							{data.labels.map((item, index) => (
								<div key={index}>
									{item}&nbsp;
									<span
										style={{
											display: 'inline-block',
											width: '60px',
											height: '10px',
											backgroundColor: data.datasets[0].backgroundColor[index],
											marginRight: '5px'
										}}
									></span>
								</div>
							))}
						</MDTypography>

						<Pie data={data} options={options} redraw />
					</MDBox>
				),
				[chart, height]
			)}
		</MDBox>
	);

	return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PieChart
PieChart.defaultProps = {
	icon: { color: 'info', component: '' },
	title: '',
	description: '',
	height: '19.125rem'
};

// Typechecking props for the PieChart
PieChart.propTypes = {
	icon: PropTypes.shape({
		color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
		component: PropTypes.node
	}),
	title: PropTypes.string,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired
};

export default PieChart;
