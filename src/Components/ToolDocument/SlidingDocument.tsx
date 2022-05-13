import DocumentList from "../../layout/DocumentList";
import MyProjectList from "../../layout/MyProjectList";

const SlidingDocument = () => {
  return (
    <div className="flex fixed top-0 left-0 mt-12 h-full">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="sm:hidden">
        <DocumentList />
      </div>
    </div>
  );
};

export default SlidingDocument;
