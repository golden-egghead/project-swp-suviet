import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import MDBox from '../../../components/MDBox';
import MDInput from '../../../components/MDInput';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Breadcrumbs from '../../Breadcrumbs';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu } from './styles';
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from '../../../context';

function DashboardNavbar({ absolute, light, isMini }) {
	const [navbarType, setNavbarType] = useState();
	const [controller, dispatch] = useMaterialUIController();
	const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
	const route = useLocation().pathname.split('/').slice(1);

	useEffect(() => {
		if (fixedNavbar) {
			setNavbarType('sticky');
		} else {
			setNavbarType('static');
		}

		function handleTransparentNavbar() {
			setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
		}

		window.addEventListener('scroll', handleTransparentNavbar);
		handleTransparentNavbar();

		return () => window.removeEventListener('scroll', handleTransparentNavbar);
	}, [dispatch, fixedNavbar]);

	const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
	const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

	const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
		color: () => {
			let colorValue = light || darkMode ? white.main : dark.main;

			if (transparentNavbar && !light) {
				colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
			}

			return colorValue;
		}
	});

	return (
		<AppBar
			position={absolute ? 'absolute' : navbarType}
			color="inherit"
			sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
		>
			<Toolbar sx={(theme) => navbarContainer(theme)}>
				{/* <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
					<Breadcrumbs icon={<HomeIcon />} title={route[route.length - 1]} route={route} light={light} />
				</MDBox> */}
				{isMini ? null : (
					<MDBox sx={(theme) => navbarRow(theme, { isMini })}>
						<MDBox color={light ? 'white' : 'inherit'}>
							<IconButton
								size="small"
								disableRipple
								color="inherit"
								sx={navbarMobileMenu}
								onClick={handleMiniSidenav}
							>
								{miniSidenav ? (
									<MenuOpenIcon sx={iconsStyle} fontSize="medium" />
								) : (
									<MenuIcon sx={iconsStyle} fontSize="medium" />
								)}
							</IconButton>
							<IconButton
								size="small"
								disableRipple
								color="inherit"
								sx={navbarIconButton}
								onClick={handleConfiguratorOpen}
							></IconButton>
						</MDBox>
					</MDBox>
				)}
			</Toolbar>
		</AppBar>
	);
}

DashboardNavbar.defaultProps = {
	absolute: false,
	light: false,
	isMini: false
};

DashboardNavbar.propTypes = {
	absolute: PropTypes.bool,
	light: PropTypes.bool,
	isMini: PropTypes.bool
};

export default DashboardNavbar;
