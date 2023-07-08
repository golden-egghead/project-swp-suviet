// Material Dashboard 2 React base styles
import colors from '../../base/colors';
import boxShadows from '../../base/boxShadows';
import borders from '../../base/borders';

const { background } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
	styleOverrides: {
		root: {
			backgroundColor: background.card,
			boxShadow: md,
			borderRadius: borderRadius.xl
		}
	}
};

export default tableContainer;
