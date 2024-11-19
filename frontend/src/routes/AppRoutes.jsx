import AdminRoutes from "./AdminRoutes";
import BloodbankRoutes from "./BloodbankRoutes";

function AppRoutes() {
  return (
    <div>
      <BloodbankRoutes />;
      <AdminRoutes />
    </div>
  );
}

export default AppRoutes;
