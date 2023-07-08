
import Videos from './layouts/Video'
import Logout from './layouts/logout'
import Characters from './layouts/Character'
import Books from './layouts/Book'
// @mui icons
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const routes = [
	
	{
		type: 'collapse',
		name: 'Video',
		key: 'video',
		icon: <ManageAccountsIcon fontSize="small" />,
		route: 'video',
		component: <Videos />
	},
	{
		type: 'collapse',
		name: 'Nhân Vật',
		key: 'character',
		icon: <ManageAccountsIcon fontSize="small" />,
		route: 'character',
		component: <Characters />
	},
	{
		type: 'collapse',
		name: 'Sách',
		key: 'book',
		icon: <ManageAccountsIcon fontSize="small" />,
		route: 'book',
		component: <Books />
	},
	{
		type: 'collapse',
		name: 'Thoát Đăng Nhập',
		key: 'logout',
		icon: <LogoutIcon fontSize="small" />,
		route: 'moderator/logout',
		component: <Logout />
	}
];

export default routes;
