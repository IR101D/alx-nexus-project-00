// components/MinimalPageCover.tsx
import { PageCoverProps } from "@/interfaces";

const PageCover = ({ pageTitle, height = "h-48",overlayOpacity = 30}: PageCoverProps) => 
  {
  return (
    <div
      className={`relative ${height} w-full bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: "url('/assets/backgroundCover.jpg')" }}
    >
      <div
  className="absolute inset-0 bg-black flex items-center"
  style={{ opacity: overlayOpacity / 100 }}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{pageTitle}</h1>
        </div>
      </div>
    </div>
  );
};
export default PageCover;
