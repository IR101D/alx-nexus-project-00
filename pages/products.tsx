import PageCover from "../components/layout/PageCover";
import React from "react";

const Products: React.FC = () => {
    return (
        <div>
         <PageCover
         pageTitle="Products"
         height="h-64"
         overlayOpacity={40}
         />
        </div>
    )
}
export default Products;