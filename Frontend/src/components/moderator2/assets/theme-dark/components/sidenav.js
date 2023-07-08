// Material Dashboard 2 React base styles
import colors from '../base/colors';
import borders from '../base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from '../functions/pxToRem';

const { background } = colors;
const { borderRadius } = borders;

const sidenav = {
	styleOverrides: {
		root: {
			width: pxToRem(250),
			whiteSpace: 'nowrap',
			border: 'none'
		},

		paper: {
			width: pxToRem(250),
			backgroundColor: background.sidenav,
			height: `calc(100vh - ${pxToRem(32)})`,
			margin: pxToRem(16),
			borderRadius: borderRadius.xl,
			border: 'none'
		},

		paperAnchorDockedLeft: {
			borderRight: 'none'
		}
	}
};

export default sidenav;
