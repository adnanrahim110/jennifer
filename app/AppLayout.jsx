import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
