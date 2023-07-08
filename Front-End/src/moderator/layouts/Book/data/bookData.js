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




const Book = ({ src }) => (
	<MDBox display="flex" alignItems="center" lineHeight={1}>
		<MDBox ml={2} lineHeight={1}>		
				<img style={{height:'100px', width:'100px'}} src={src} alt=''></img>
			{/* <MDTypography variant="caption" fontSize={15}>ID: {id}</MDTypography> */}
		</MDBox>
	</MDBox>
);
  

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
				const { data } = await axios.get(`http://localhost:8080/api/Books/${page}`);
				setData((prevData) => [...prevData, ...data.data.content]);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchAllData = async () => {
			for (let i = 1; i <= 20; i++) {
				await getData(i);
			}
		};

		fetchAllData();
	}, []);

	//Edit
	const navigate = useNavigate();

	const EditFunction = (bookID) => {
		navigate("/moderator/book/edit/" + bookID);
	  }

	// const handleEditVideo = async (item) => {
	// 	const updatedData = accountData.map((dataItem) => {
	// 		if (dataItem.userID === item.userID) {
	// 			const updatedItem = { ...dataItem, enabled: !dataItem.enabled };
	// 			// fetchApi(`http://localhost:8080/api/admin`,'method(PUT, DELETE, ...)');
	// 			return updatedItem;
	// 		}
	// 		return dataItem;
	// 	});

	// 	setData(updatedData);
	// };

	const handleChangeActive = async (item) => {
		const updatedData = accountData.map((dataItem) => {
			if (dataItem.userID === item.userID) {
				const updatedItem = { ...dataItem, roleID: dataItem.roleID == 2 ? 3 : 2 };
				fetchApi(dataItem.userID);
				return updatedItem;
			}
			return dataItem;
		});

		setData(updatedData);
	};

	const rows = accountData.map((item) => ({
		ID: <Id id={item.bookID} />,
		Book: <Book src={item.cover} />,
		Title: <Function title={item.title} />,
		Action: (<>
			<Button variant="outlined" color='success' style={{ margin: '5px', backgroundColor: 'green' }}
				className='edit-btn'
				onClick={() => { EditFunction(item.videoID) }}>
				<EditIcon />
			</Button>
			<Button variant="outlined" color='error' style={{ margin: '5px', backgroundColor: 'red' }}
				className='delete-btn'
				onClick={() => { handleChangeActive(item.videoID) }}>
				<DeleteIcon />
			</Button>
		</>),
	}));

	return {
		columns: [
			{ Header: <div style={{fontSize:'20px', color:'red', paddingLeft:'12px'}}>ID</div>, accessor: 'ID', align: 'center'},
			{ Header: <div style={{ fontSize: '20px', color: 'red' }}>Hình Ảnh</div>, accessor: 'Book', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red' }}>Tiêu Đề</div>, accessor: 'Title', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red', textAlign: 'center' }}>Trạng Thái</div>, accessor: 'Action', align: 'center' },
		],
		rows: rows || []
	};
}