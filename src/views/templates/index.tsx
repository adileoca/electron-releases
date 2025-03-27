import { TemplatesTableProvider } from "./context";
import ViewBody from "./ViewBody";

const TemplatesView = () => {
  return (
    <TemplatesTableProvider>
      <ViewBody />
    </TemplatesTableProvider>
  );
};

export default TemplatesView;
