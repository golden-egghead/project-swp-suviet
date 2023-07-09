
import Videos from './layouts/Video';
import Logout from './layouts/logout';
import Characters from './layouts/Character';
import Books from './layouts/Book';
import Sites from './layouts/Site';
import Items from './layouts/Item';
// @mui icons
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MuseumIcon from '@mui/icons-material/Museum';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

const routes = [
	
	{
		type: 'collapse',
		name: 'Video',
		key: 'video',
		icon: <OndemandVideoIcon fontSize="small" />,
		route: 'video',
		component: <Videos />
	},
	{
		type: 'collapse',
		name: 'Nhân Vật',
		key: 'character',
		icon: <AccountBoxIcon fontSize="small" />,
		route: 'character',
		component: <Characters />
	},
	{
		type: 'collapse',
		name: 'Sách',
		key: 'book',
		icon: <AutoStoriesIcon  fontSize="small" />,
		route: 'book',
		component: <Books />
	},
	{
		type: 'collapse',
		name: 'Di Tích',
		key: 'site',
		icon: <MuseumIcon  fontSize="small" />,
		route: 'site',
		component: <Sites />
	},
	{
		type: 'collapse',
		name: 'Cổ Vật - Bảo Vật',
		key: 'item',
		icon: <CategoryIcon  fontSize="small" />,
		route: 'item',
		component: <Items />
	},
	{
		type: 'collapse',
		name: 'Thoát Đăng Nhập',
		key: 'logout',
		icon: <LogoutIcon fontSize="small" />,
		route: 'logout',
		component: <Logout />
	}
];

export default routes;
