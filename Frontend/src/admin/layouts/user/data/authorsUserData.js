import React, { useState, useEffect } from 'react';
import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
import MDBadge from '../../../components/MDBadge';

// Images
// import team2 from '../../../assets/images/team-2.jpg';
import updateAccount from '../../updateAccount';
import updateMember from '../../updateMember';
import axios from 'axios';


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

const Author = ({ name, id }) => (
	<MDBox display="flex" alignItems="center" lineHeight={1}>
		<MDBox ml={2} lineHeight={1}>
			<MDTypography display="block" variant="button" fontWeight="medium" fontSize={20}>
				{name}
			</MDTypography>
			{/* <MDTypography variant="caption" fontSize={15}>ID: {id}</MDTypography> */}
		</MDBox>
	</MDBox>
);

const Function = ({ title }) => (
	<MDBox lineHeight={1} textAlign="left">
		<MDTypography display="block" variant="caption" color="text" fontWeight="medium" fontSize={20}>
			{title}
		</MDTypography>
	</MDBox>
);

export default function Data() {
	const [accountData, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get('http://localhost:8080/api/admin');

			setData(data.data);
		};
		getData();
	}, []);

	const handleBanMember = async (item) => {
		const updatedData = accountData.map((dataItem) => {
			if (dataItem.userID === item.userID) {
				const updatedItem = { ...dataItem, enabled: !dataItem.enabled };				
				updateAccount(dataItem.userID);
				return updatedItem;
			}
			return dataItem;
		});

		setData(updatedData);
	};

	const handleChangeActive = async (item) => {
		const updatedData = accountData.map((dataItem) => {
			if (dataItem.userID === item.userID) {
				const updatedItem = { ...dataItem, roleID: dataItem.roleID == 2 ? 3:2};	
				updateMember(dataItem.userID);
				return updatedItem;
			}
			return dataItem;
		});

		setData(updatedData);
	};

	const rows = accountData.map((item) => ({
		ID: <Id id={item.userID}/>,
		author: <Author name={item.fullname} />,
		Email: <Function title={item.email} />,
		state: (
			<MDBox ml={-1} onClick={() => handleBanMember(item)}>
				<MDBadge
					badgeContent={item.enabled
						? 'Active' : 'Banned'}
					color={item.enabled
						? 'success' : 'error'}
					variant="gradient"
					size="sm"
				/>
			</MDBox>
		),
		Role: (
			<MDBox ml={-1} onClick={() => handleChangeActive(item)}>
				<MDBadge
					badgeContent={item.roleID == 2
						? 'Member' : 'Moderator'}
					color={item.roleID == 2
						? 'success' : 'warning'}
					variant="gradient"
					size="sm"
				/>
			</MDBox>
		),
	}));

	return {
		columns: [
			{ Header: <div style={{fontSize:'20px', color:'red', paddingLeft:'12px'}}>ID</div>, accessor: 'ID', align: 'left'},
			{ Header: <div style={{fontSize:'20px', color:'red', paddingLeft:'15px'}}>Họ Và Tên</div>, accessor: 'author', align: 'left'},
			{ Header: <div style={{fontSize:'20px', color:'red'}}>Email</div>, accessor: 'Email', align: 'left'},
			{ Header: <div style={{fontSize:'20px', color:'red', textAlign:'center'}}>Trạng Thái</div>, accessor: 'state', align: 'center' },
			{ Header: <div style={{fontSize:'20px', color:'red', textAlign:'center'}}>Vai Trò</div>, accessor: 'Role', align: 'center' },
		],
		rows: rows || []
	};
}
