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
import DeleteMaliciousFileSignatureDialog
  from '@/components/admin/malicious-files-signatures/dialogs/delete';

export default function MaliciousFileSignatureListResults({ allMaliciousFileSignatures, totalResults, page, onPageChange, limit, onLimitChange, refreshData, ...rest }){
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

  function deleteMaliciousFileSignatureDialog(id){
    setActionID(id)
    setOpenDeleteDialog(true)
  }

  function deleteMaliciousFileSignatureAPI(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + 'malicious-files-signatures/' + actionID,
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
                  {t('file_signature')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('file_signature_type')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('file_type')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allMaliciousFileSignatures.map((singleMaliciousFile) => (
                <TableRow
                  key={singleMaliciousFile.id}
                  hover
                >
                  <TableCell
                    align={"center"}
                  >
                    {singleMaliciousFile.id}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleMaliciousFile.file_signature}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleMaliciousFile.file_signature_type}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleMaliciousFile.file_category}
                  </TableCell>
                  <TableCell
                    align={'center'}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Tooltip title={t('view')} placement={"top"}>
                          <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/malicious-file-signature/" + singleMaliciousFile.id)}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('edit')} placement={"top"}>
                          <ModeEditIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/file_category/" + singleMaliciousFile.id + "/edit")}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('delete')} placement={"top"}>
                          <DeleteIcon style={{cursor: "pointer"}} onClick={() => deleteMaliciousFileSignatureDialog(singleMaliciousFile.id)}/>
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
        <DeleteMaliciousFileSignatureDialog
          maliciousFileSignatureID={actionID}
          onClose={() => setOpenDeleteDialog(false)}
          onSave={deleteMaliciousFileSignatureAPI}
        />
      }
    </Card>
  );
};
