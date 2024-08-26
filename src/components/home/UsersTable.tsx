import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserStore } from "../../store/user";
import {
  deleteAllModalNotification,
  deleteModalNotification,
} from "../notifications/notifications";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5", // Example background color
  },
}));

export default function UsersTable() {
  const { usersList, sendDeleteItem, sendGetItem, resetAllUsers } = useUserStore();

  //   console.log(item);
  const deleteUserItem = (id: string) => {
    deleteModalNotification(sendDeleteItem, id);
  };

  const removeAllUsers = () => {
    deleteAllModalNotification(resetAllUsers);
  };

  return (
    <section className="myContainer my-6 ">
      <TableContainer component={Paper}>
        <Table className="border" sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersList.length > 0 ? (
              usersList.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography color="text.primary" className="!font-semibold text-base">
                      {user.name}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography color="text.primary" className="!font-semibold text-base">
                      {user.email}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography color="text.primary" className="!font-semibold text-base">
                      {user.phone}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography color="text.primary" className="!font-semibold text-base">
                      {user.address}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography color="text.primary" className="!font-semibold text-base">
                      {user.date_of_birth}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="flex justify-start gap-1 items-center">
                      <Button
                        className="!rounded-full bg-transparent !size-4 !min-w-10 !min-h-10"
                        onClick={() => deleteUserItem(user.id as string)}
                      >
                        <DeleteIcon className="text-red-500" />
                      </Button>
                      <Button
                        className="!rounded-full bg-transparent !size-4 !min-w-10 !min-h-10"
                        onClick={() => sendGetItem(user)}
                      >
                        <EditIcon className="text-yellow-400" />
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No Data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-3 flex justify-end">
        <Button
          className=" "
          size="large"
          variant="contained"
          color="error"
          onClick={removeAllUsers}
        >
          Remove all users
        </Button>
      </div>
    </section>
  );
}
