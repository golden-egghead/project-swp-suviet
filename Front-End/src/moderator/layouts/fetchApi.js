import { toast } from 'react-toastify';

const fetchApi = async (url, method) => {
	try {
		const response = await fetch(url, {
			method: method?.toUpperCase(),
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

export default fetchApi;


