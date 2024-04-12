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
import DeleteBlogPostDialog from '@/components/admin/blog-posts/dialogs/delete';

export default function BlogPostsListResults({ allBlogPosts, totalResults, page, onPageChange, limit, onLimitChange, refreshData, ...rest }){
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

  function deleteBlogPostDialog(id){
    setActionID(id)
    setOpenDeleteDialog(true)
  }

  function deleteBlogPostAPI(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/' + actionID,
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
                  {t('blog_post_title')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('blog_post_author')}
                </TableCell>
                <TableCell
                  align={"center"}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBlogPosts.map((singleBlogPost) => (
                <TableRow
                  key={singleBlogPost.id}
                  hover
                >
                  <TableCell
                    align={"center"}
                  >
                    {singleBlogPost.id}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleBlogPost.post_title}
                  </TableCell>
                  <TableCell
                    align={"center"}
                  >
                    {singleBlogPost.post_author_details.first_name} {singleBlogPost.post_author_details.last_name}
                  </TableCell>
                  <TableCell
                    align={'center'}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Tooltip title={t('view')} placement={"top"}>
                          <RemoveRedEyeIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/blog-post/" + singleBlogPost.id)}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('edit')} placement={"top"}>
                          <ModeEditIcon style={{cursor: "pointer"}} onClick={() => router.push("/admin-panel/blog-post/" + singleBlogPost.id + "/edit")}/>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={t('delete')} placement={"top"}>
                          <DeleteIcon style={{cursor: "pointer"}} onClick={() => deleteBlogPostDialog(singleBlogPost.id)}/>
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
        <DeleteBlogPostDialog
          blogPostID={actionID}
          onClose={() => setOpenDeleteDialog(false)}
          onSave={deleteBlogPostAPI}
        />
      }
    </Card>
  );
};
