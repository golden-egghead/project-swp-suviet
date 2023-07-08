// Material Dashboard 2 React base styles
import colors from '../../base/colors';
import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';

// Material Dashboard 2 React helper functions
import pxToRem from '../../functions/pxToRem';
import linearGradient from '../../functions/linearGradient';

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

const stepper = {
	styleOverrides: {
		root: {
			background: linearGradient(gradients.info.main, gradients.info.state),
			padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
			borderRadius: borderRadius.lg,
			boxShadow: colored.info,

			'&.MuiPaper-root': {
				backgroundColor: transparent.main
			}
		}
	}
};

export default stepper;
