import { Container, Table } from "react-bootstrap";
import AdminTemplate from "../../templates/AdminTemplate";

const AdminDashboard = () => {
  return (
    <AdminTemplate>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
      </Table>
    </AdminTemplate>
  );
};

export default AdminDashboard;
