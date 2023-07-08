// Material Dashboard 2 React base styles
import typography from '../../base/typography';
import colors from '../../base/colors';

// Material Dashboard 2 React helper functions
import rgba from '../../functions/rgba';

const { size } = typography;
const { white } = colors;

const dialogContentText = {
	styleOverrides: {
		root: {
			fontSize: size.md,
			color: rgba(white.main, 0.8)
		}
	}
};

export default dialogContentText;
