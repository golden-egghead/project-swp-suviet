import React, { useState, useEffect } from 'react';
import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
// import MDBadge from '../../../components/MDBadge';

// Images
// import team2 from '../../../assets/images/team-2.jpg';
import fetchApi from '../../fetchApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import ModalCase from './showPopup';
import { toast } from 'react-toastify';

const Id = ({ id }) => (
	<MDBox display="flex" alignItems="center" lineHeight={1}>
		<MDBox ml={2} lineHeight={1}>
			<MDTypography display="block" variant="button" fontWeight="medium" fontSize={20}>
				{id}
			</MDTypography>
			{/* <MDTypography variant="caption" fontSize={15}>ID: {id}</MDTypography> */}
		</MDBox>
	</MDBox>
);




const Video = ({ item }) => {
	const [open, setOpen] = useState(false);

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<MDBox display="flex" alignItems="center" lineHeight={1}>
			<MDBox ml={2} lineHeight={1}>
				<MDTypography
					display="block"
					variant="button"
					fontWeight="medium"
					fontSize={15}
					onClick={handleOpenModal}
				>
					<Button style={{ backgroundColor: 'yellow', color: 'black' }}>Watch Video</Button>
				</MDTypography>
				{open && (
					<ModalCase setOpen={handleCloseModal} url={item.video} />
				)}
			</MDBox>
		</MDBox>
	);
};


const Function = ({ title }) => (
	<MDBox lineHeight={1} textAlign="left" width="300px">
		<MDTypography display="block" variant="caption" color="black" fontWeight="medium" fontSize={17}>
			{title}
		</MDTypography>
	</MDBox>
);



export default function VideoData() {
	const [accountData, setAccountData] = useState([]);
	useEffect(() => {
		const getData = async (page) => {
			try {
				const { data } = await axios.get(`http://localhost:8080/api/videos/${page}`);
				return data.data.content;
			} catch (error) {
				console.error(error);
				return [];
			}
		};

		const fetchAllData = async () => {
			const requests = [];
			for (let i = 1; i <= 20; i++) {
				requests.push(getData(i));
			}
			const responses = await Promise.all(requests);
			const mergedData = responses.flat();
			setAccountData(mergedData);
		};

		fetchAllData();
	}, []);

	//Edit
	const navigate = useNavigate();

	const EditFunction = (item) => {
		navigate("/moderator/video/edit/" + item.videoID, { state: item });
	}

	const RemoveVideo = async (videoID) => {
		if (window.confirm('Do you want to remove?')) {
		  try {
			const baseUrl = `http://localhost:8080/api/videos/delete-video/`;
			const response = await fetch(baseUrl + videoID, {
			  method: 'DELETE',
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			  }
			});
	
			if (response.ok) {
			  setAccountData((prevData) => prevData.filter((item) => item.videoID !== videoID));
			  toast.success('Xóa Thành Công!');
			} else {
			  throw new Error('Xóa Thất Bại');
			}
		  } catch (err) {
			console.log(err.message);
		  }
		}
	  };
	  

	const rows = accountData.map((item) => ({
		ID: <Id id={item.videoID} />,
		Video: <Video item={item} />,
		Title: <Function title={item.title} />,
		Action: (<>
			<Button variant="outlined" color='success' style={{ margin: '5px', backgroundColor: 'green' }}
				className='edit-btn'
				onClick={() => { EditFunction(item) }}>
				<EditIcon />
			</Button>
			<Button variant="outlined" color='error' style={{ margin: '5px', backgroundColor: 'red' }}
				className='delete-btn'
				onClick={() => { RemoveVideo(item.videoID) }}>
				<DeleteIcon />
			</Button>
		</>),
	}));

	return {
		columns: [
			{ Header: <div style={{ fontSize: '20px', color: 'red', paddingLeft: '12px' }}>ID</div>, accessor: 'ID', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red' }}>Video</div>, accessor: 'Video', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red' }}>Tiêu Đề</div>, accessor: 'Title', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red', textAlign: 'center' }}>Trạng Thái</div>, accessor: 'Action', align: 'center' },
		],
		rows: rows || []
	};
}
