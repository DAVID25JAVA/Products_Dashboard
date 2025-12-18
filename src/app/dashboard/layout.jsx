import Navbar, { NAVBAR_HEIGHT } from "@/components/Dashboard/Navbar";
import SideBar from "@/components/Dashboard/Sidebar";

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <SideBar />

        <main
          style={{
            marginTop: NAVBAR_HEIGHT,
            marginLeft: drawerWidth,
            padding: "24px",
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
