import { useState, useEffect, useMemo } from 'react';

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from './components/MDBox';
import SettingsIcon from '@mui/icons-material/Settings';
// Material Dashboard 2 React example components
import Sidenav from './examples/Sidenav';
import Configurator from './examples/Configurator';

import theme from './assets/theme';
import themeRTL from './assets/theme/theme-rtl';

import themeDark from './assets/theme-dark';
import themeDarkRTL from './assets/theme-dark/theme-rtl';
import { styled } from '@mui/system';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import routes from './routes';
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from './context';
import brandWhite from './assets/images/logo-ct.png';
import brandDark from './assets/images/logo-ct-dark.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Moderator() {
	const [controller, dispatch] = useMaterialUIController();
	const {
		miniSidenav,
		direction,
		layout,
		openConfigurator,
		sidenavColor,
		transparentSidenav,
		whiteSidenav,
		darkMode
	} = controller;
	const [onMouseEnter, setOnMouseEnter] = useState(false);
	const [rtlCache, setRtlCache] = useState(null);
	const { pathname } = useLocation();

	// Cache for the rtl
	useMemo(() => {
		const cacheRtl = createCache({
			key: 'rtl',
			stylisPlugins: [rtlPlugin]
		});

		setRtlCache(cacheRtl);
	}, []);

	// Open sidenav when mouse enter on mini sidenav
	const handleOnMouseEnter = () => {
		if (miniSidenav && !onMouseEnter) {
			setMiniSidenav(dispatch, false);
			setOnMouseEnter(true);
		}
	};

	// Close sidenav when mouse leave mini sidenav
	const handleOnMouseLeave = () => {
		if (onMouseEnter) {
			setMiniSidenav(dispatch, true);
			setOnMouseEnter(false);
		}
	};

	// Change the openConfigurator state
	const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

	// Setting the dir attribute for the body element
	useEffect(() => {
		document.body.setAttribute('dir', direction);
	}, [direction]);

	// Setting page scroll to 0 when changing the route
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	}, [pathname]);

	const getRoutes = (allRoutes) =>
		allRoutes.map((route) => {
			if (route.collapse) {
				return getRoutes(route.collapse);
			}

			if (route.route) {
				return <Route exact path={route.route} element={route.component} key={route.key} />;
			}

			return null;
		});

	const RotatingIcon = styled(Icon)`
		animation: rotate 5s linear infinite;
		display: flex;
		justify-content: center;
		align-items: center;

		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	`;

	const configsButton = (
		<MDBox
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="3rem"
			height="3rem"
			bgColor="white"
			shadow="sm"
			borderRadius="50%"
			position="fixed"
			right="2rem"
			bottom="2rem"
			zIndex={99}
			color="dark"
			sx={{ cursor: 'pointer' }}
			onClick={handleConfiguratorOpen}
		>
			<RotatingIcon fontSize="large" color="inherit">
				<SettingsIcon />
			</RotatingIcon>
		</MDBox>
	);

	return (
		<>
			{direction === 'rtl' ? (
				<CacheProvider value={rtlCache}>
					<ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
						<CssBaseline />
						{layout === 'dashboard' && (
							<>
								<Sidenav
									color={sidenavColor}
									brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
									brandName="Admin Dashboard"
									routes={routes}
									onMouseEnter={handleOnMouseEnter}
									onMouseLeave={handleOnMouseLeave}
								/>
								<Configurator />
								{configsButton}
							</>
						)}
						{layout === 'vr' && <Configurator />}
						<Routes>
							{getRoutes(routes)}
							<Route path="" element={<Navigate to="/moderator" />} />
							<Route path="/moderator/video" element={<Navigate to="/moderator/video" />} />
							<Route path="/moderator/character" element={<Navigate to="/moderator/character" />} />
							{/* <Route path="" element={<Navigate to="/moderator" />} /> */}
						</Routes>
					</ThemeProvider>
				</CacheProvider>
			) : (
				<ThemeProvider theme={darkMode ? themeDark : theme}>
					<CssBaseline />
					{layout === 'dashboard' && (
						<>
							<Sidenav
								color={sidenavColor}
								brandName={<span style={{ fontSize: '30px' }}>SỬ VIỆT</span>}
								routes={routes}
								onMouseEnter={handleOnMouseEnter}
								onMouseLeave={handleOnMouseLeave}
							/>
							<Configurator />
							{configsButton}
						</>
					)}
					{layout === 'vr' && <Configurator />}
					<Routes>
						{getRoutes(routes)}
						<Route path="" element={<Navigate to="/moderator/video" />} />
						{/* <Route path="/moderator/video" element={<Navigate to="/moderator/video" />} /> */}
						<Route path="/moderator/character" element={<Navigate to="/moderator/character" />} />
					</Routes>
				</ThemeProvider>
			)}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}
