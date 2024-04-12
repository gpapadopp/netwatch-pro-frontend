import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, Tooltip,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import DeleteInternetPackageDialog from '@/components/admin/internet-packages/dialogs/delete';

export default function InternetPackagesListResults({ allInternetPackages, totalResults, page, onPageChange, limit, onLimitChange, refreshData, ...rest }){
  const { t } = useTranslation('common')
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [actionID, setActionID] = useState(0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleLimitChange = (event) => {
    onLimitChange.call(this, event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    onPageChange.call(this, (newPage + 1));
  };

  function deleteInternetPackageDialog(id){
    setActionID(id)
    setOpenDeleteDialog(true)
  }

  function deleteInternetPackageAPI(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + 'internet-packages/' + actionID,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setOpenDeleteDialog(false)
           refreshData.call(this)
         })
         .catch((error) => {
           setOpenDeleteDialog(false)
         });
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align={"center"}
                >
                  ID
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('source_ip')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('destination_ip')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('source_mac_address')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('destination_mac_address')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allInternetPackages.map((singleInternetPackage) => (
                <TableRow
                  key={singleInternetPackage.id}
                  hover
                >
                  <TableCell
                    align={"center"}
                  >
                    {singleInternetPackage.id}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleInternetPackage.source_ip}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleInternetPackage.destination_ip}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleInternetPackage.source_mac_address}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleInternetPackage.destination_mac_address}
                  </TableCell>
                  <TableCell
                    align={'center'}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Tooltip title={t('view')} placement={"top"}>
                          <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/internet-package/" + singleInternetPackage.id)}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('edit')} placement={"top"}>
                          <ModeEditIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/internet-package/" + singleInternetPackage.id + "/edit")}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('delete')} placement={"top"}>
                          <DeleteIcon style={{cursor: "pointer"}} onClick={() => deleteInternetPackageDialog(singleInternetPackage.id)}/>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalResults}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={(page - 1)}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
      />
      {openDeleteDialog &&
        <DeleteInternetPackageDialog
          internetPackageID={actionID}
          onClose={() => setOpenDeleteDialog(false)}
          onSave={deleteInternetPackageAPI}
        />
      }
    </Card>
  );
};
