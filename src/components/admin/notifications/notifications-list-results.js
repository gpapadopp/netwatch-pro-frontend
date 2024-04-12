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
  TableRow, Tooltip,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import moment from 'moment';
import DeleteNotificationDialog from '@/components/admin/notifications/dialogs/delete';

export default function NotificationsListResults({ allNotifications, refreshData, ...rest }){
  const { t } = useTranslation('common')
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [actionID, setActionID] = useState(0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  function deleteNotificationDialog(id){
    setActionID(id)
    setOpenDeleteDialog(true)
  }

  function deleteNotificationAPI(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + 'notifications/' + actionID,
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

  function formatDate(dateToFormat){
    const parsedDate = moment.utc(dateToFormat).local()
    return parsedDate.format("DD/MM/YYYY HH:mm:ss")
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
                  {t('notification_title')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('created_at')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allNotifications.map((singleNotification) => (
                <TableRow
                  key={singleNotification.id}
                  hover
                >
                  <TableCell
                    align={"center"}
                  >
                    {singleNotification.id}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleNotification.title}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {formatDate(singleNotification.created_at)}
                  </TableCell>
                  <TableCell
                    align={'center'}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Tooltip title={t('view')} placement={"top"}>
                          <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/notification/" + singleNotification.id)}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('edit')} placement={"top"}>
                          <ModeEditIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/notification/" + singleNotification.id + "/edit")}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('delete')} placement={"top"}>
                          <DeleteIcon style={{cursor: "pointer"}} onClick={() => deleteNotificationDialog(singleNotification.id)}/>
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
      {openDeleteDialog &&
        <DeleteNotificationDialog
          notificationID={actionID}
          onClose={() => setOpenDeleteDialog(false)}
          onSave={deleteNotificationAPI}
        />
      }
    </Card>
  );
};
