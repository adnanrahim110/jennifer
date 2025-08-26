import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import RouteLoadingOverlay from "@/components/system/RouteLoadingOverlay";
import "@/styles/route-loader.css";

const AppLayout = ({ children }) => {
  return (
    <>
      <RouteLoadingOverlay />
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
