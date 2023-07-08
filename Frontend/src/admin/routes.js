
import Users from './layouts/user';
import Logout from './layouts/logout/LogoutAdmin'


// @mui icons
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


const routes = [
	{
		type: 'collapse',
		name: 'Người Dùng',
		key: 'user',
		icon: <ManageAccountsIcon fontSize="small" />,
		route: 'admin/user',
		component: <Users />
	},
	{
		type: 'collapse',
		name: 'Thoát Đăng Nhập',
		key: 'logout',
		icon: <LogoutIcon fontSize="small" />,
		route: 'admin/logout',
		component: <Logout />
	}
];

export default routes;
