import ReduxProvider from "@/src/store/providers/ReduxProvider";
import FeatureBar from "./FeatureBar";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <> <ReduxProvider>
       <Header/>
          <main className="min-h-screen">{children}</main>
        <FeatureBar/>
      <Footer />
      </ReduxProvider>
    </>
  );
}

export default Layout;