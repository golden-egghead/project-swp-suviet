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



const Article = ({ src }) => (
	<MDBox display="flex" alignItems="center" lineHeight={1}>
		<MDBox ml={2} lineHeight={1}>		
				<img style={{height:'100px', width:'100px'}} src={src} alt=''></img>
			{/* <MDTypography variant="caption" fontSize={15}>ID: {id}</MDTypography> */}
		</MDBox>
	</MDBox>
);
  

const Function = ({ title }) => (
	<MDBox lineHeight={1} textAlign="left" width="300px">
		<MDTypography display="block" variant="caption" color="black" fontWeight="medium" fontSize={18}>
			{title}
		</MDTypography>
	</MDBox>
);

export default function ArticleData() {
	const [accountData, setAccountData] = useState([]);
	useEffect(() => {
		const getData = async (page) => {
			try {
				const { data } = await axios.get(`http://localhost:8080/api/articles/${page}`);
				return data.data;
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
            console.log(mergedData);
			setAccountData(mergedData);
		};

		fetchAllData();
	}, []);

	//Edit
	const navigate = useNavigate();

	const EditFunction = (item) => {
		navigate("/moderator/article/edit/" + item.articleID, { state: item });
	  }

	  const RemoveSite = async (articleID) => {
		if (window.confirm('Do you want to remove?')) {
		  try {
			const baseUrl = `http://localhost:8080/api/articles/`;
			const response = await fetch(baseUrl + articleID, {
			  method: 'DELETE',
			  headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			  }
			});
	
			if (response.ok) {
			  setAccountData((prevData) => prevData.filter((item) => item.articleID !== articleID));
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
		ID: <Id id={item.articleID} />,
		Article: <Article src={item.photo} />,
		Title: <Function title={item.title} />,
		Action: (<>
			<Button variant="outlined" color='success' style={{ margin: '5px', backgroundColor: 'green' }}
				className='edit-btn'
				onClick={() => { EditFunction(item) }}>
				<EditIcon />
			</Button>
			<Button variant="outlined" color='error' style={{ margin: '5px', backgroundColor: 'red' }}
				className='delete-btn'
				onClick={() => { RemoveSite(item.articleID) }}>
				<DeleteIcon />
			</Button>
		</>),
	}));

	return {
		columns: [
			{ Header: <div style={{fontSize:'20px', color:'red', paddingLeft:'12px'}}>ID</div>, accessor: 'ID', align: 'center'},
			{ Header: <div style={{ fontSize: '20px', color: 'red' }}>Hình Ảnh</div>, accessor: 'Article', align: 'center' },
			{ Header: <div style={{ fontSize: '20px', color: 'red', paddingLeft:'58px' }}>Bài Viết</div>, accessor: 'Title', align: 'left' },
			{ Header: <div style={{ fontSize: '20px', color: 'red', textAlign: 'center' }}>Tác Vụ</div>, accessor: 'Action', align: 'center' },
		],
		rows: rows || []
	};
}
