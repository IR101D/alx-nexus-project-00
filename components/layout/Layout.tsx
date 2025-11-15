import FeatureBar from "./FeatureBar";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
       <Header/>
          <main className="min-h-screen">{children}</main>
      <FeatureBar/>
      <Footer />
    </>
  );
}

export default Layout;