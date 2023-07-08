import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const FetchData = async () => {
			try {
				const response = await axios.get(url);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};

		FetchData();
	}, [url]);

	return { data, isLoading, error };
};

export default FetchData;
