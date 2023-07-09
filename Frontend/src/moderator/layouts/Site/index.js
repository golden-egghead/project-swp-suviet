// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import DataTable from '../../examples/Tables/DataTable';
// Data
import SiteData from './data/SiteData';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function Sites() {
	const { columns, rows } = SiteData();
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<Link to='/moderator/site/add'><Button style={{color: 'white'}} variant="contained" >
				Tạo Mới <AddIcon/>
			</Button></Link>
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant="gradient"
								bgColor="warning"
								borderRadius="lg"
								coloredShadow="info"
							>
								<MDTypography variant="h4" color="white" textAlign='center' fontSize='25px'>
									Di Tích
								</MDTypography>
							</MDBox>
							<MDBox pt={3}>
								<DataTable
									table={{ columns, rows }}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
		</DashboardLayout>
	);
}

export default Sites;
