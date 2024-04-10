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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useRouter } from 'next/router';
import DeleteAccessTokenDialog from '@/components/admin/access-tokens/dialogs/delete';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';

export default function AccessTokensListResults({ allAccessTokens, totalResults, page, onPageChange, limit, onLimitChange, refreshData, ...rest }){
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
    onPageChange.call(this, newPage);
  };

  function formatDate(dateToFormat){
    const parsedDate = moment.utc(dateToFormat).local()
    return parsedDate.format("dd/MM/YYYY HH:mm:ss")
  }

  function deleteAccessTokenDialog(id){
    setActionID(id)
    setOpenDeleteDialog(true)
  }

  function deleteAccessTokenAPI(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + 'access-tokens/' + actionID,
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
                  {t('issuer')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('is_enabled')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('active_since')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('active_until')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAccessTokens.map((singleAccessToken) => {
                return (
                  <>
                    <TableRow
                      key={singleAccessToken.id}
                      hover
                    >
                      <TableCell
                        align={"center"}
                      >
                        {singleAccessToken.id}
                      </TableCell>
                      <TableCell
                        align={"center"}
                      >
                        {singleAccessToken.issuer}
                      </TableCell>
                      <TableCell
                        align={"center"}
                      >
                        {(singleAccessToken.disabled) &&
                          <Tooltip title={t('is_disabled')} placement={"top"}>
                            <CloseIcon/>
                          </Tooltip>
                        }
                        {(!singleAccessToken.disabled) &&
                          <Tooltip title={t('is_enabled')} placement={"top"}>
                            <CheckIcon/>
                          </Tooltip>
                        }
                      </TableCell>
                      <TableCell
                        align={"center"}
                      >
                        {formatDate(singleAccessToken.created_at)}
                      </TableCell>
                      <TableCell
                        align={"center"}
                      >
                        {formatDate(singleAccessToken.active_until)}
                      </TableCell>
                      <TableCell
                        align={'center'}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Tooltip title={t('view')} placement={"top"}>
                              <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/access-token/" + singleAccessToken.id)}/>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={4}>
                            <Tooltip title={t('edit')} placement={"top"}>
                              <ModeEditIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/access-token/" + singleAccessToken.id + "/edit")}/>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={4}>
                            <Tooltip title={t('delete')} placement={"top"}>
                              <DeleteIcon style={{cursor: "pointer"}} onClick={() => deleteAccessTokenDialog(singleAccessToken.id)}/>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </>
                )
              })}
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
        <DeleteAccessTokenDialog
          accessTokenID={actionID}
          onClose={() => setOpenDeleteDialog(false)}
          onSave={deleteAccessTokenAPI}
        />
      }
    </Card>
  );
};
