// Material Dashboard 2 React Button Styles
import root from '../../components/button/root';
import contained from '../../components/button/contained';
import outlined from '../../components/button/outlined';
import buttonText from '../../components/button/text';

const button = {
	defaultProps: {
		disableRipple: false
	},
	styleOverrides: {
		root: { ...root },
		contained: { ...contained.base },
		containedSizeSmall: { ...contained.small },
		containedSizeLarge: { ...contained.large },
		containedPrimary: { ...contained.primary },
		containedSecondary: { ...contained.secondary },
		outlined: { ...outlined.base },
		outlinedSizeSmall: { ...outlined.small },
		outlinedSizeLarge: { ...outlined.large },
		outlinedPrimary: { ...outlined.primary },
		outlinedSecondary: { ...outlined.secondary },
		text: { ...buttonText.base },
		textSizeSmall: { ...buttonText.small },
		textSizeLarge: { ...buttonText.large },
		textPrimary: { ...buttonText.primary },
		textSecondary: { ...buttonText.secondary }
	}
};

export default button;
