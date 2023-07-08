import { toast } from 'react-toastify';

const updateAccount = async (userID) => {
	try {
		const response = await fetch(`http://localhost:8080/api/admin/ban/${userID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			},
		});

		if (response.ok) {
			toast.success('Thành Công!!');
		} else {
			toast.error('Lỗi!!');
		}
	} catch (error) {
		toast.error('An error occurred:', error);
		console.log(error);
	}
};

export default updateAccount;
