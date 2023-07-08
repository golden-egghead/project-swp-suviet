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
		<MDTypography display="block" variant="caption" color="text" fontWeight="medium" fontSize={15}>
			{title}
		</MDTypography>
	</MDBox>
);



export default function Data() {
	const [accountData, setData] = useState([]);
	useEffect(() => {
		const getData = async (page) => {
			try {
				const { data } = await axios.get(`http://localhost:8080/api/videos/${page}`);
				setData((prevData) => [...prevData, ...data.data.content]);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchAllData = async () => {
			for (let i = 1; i <= 13; i++) {
				await getData(i);
			}
		};

		fetchAllData();
	}, []);

	//Edit
	const navigate = useNavigate();

	const EditFunction = (item) => {
		navigate("/moderator/video/edit/" + item.videoID, { state: item });
	}

	// const handleChangeActive = async (item) => {
	// 	const updatedData = accountData.map((dataItem) => {
	// 		if (dataItem.userID === item.userID) {
	// 			const updatedItem = { ...dataItem, roleID: dataItem.roleID == 2 ? 3 : 2 };
	// 			fetchApi(dataItem.userID);
	// 			return updatedItem;
	// 		}
	// 		return dataItem;
	// 	});

	// 	setData(updatedData);
	// };

	const RemoveFunction = (id) => {
		if (window.confirm('Do you want to remove?')) {
			const baseUrl = `https://64994ec179fbe9bcf83ef4f0.mockapi.io/APIPE/`;
			fetch(baseUrl + id, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => {
					alert('Remove successfully!');
				})
				.catch((err) => {
					console.log(err.message);
				});
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
				onClick={() => { RemoveFunction(item.videoID) }}>
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
