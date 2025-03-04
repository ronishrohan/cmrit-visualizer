import { useState } from "react";
import { Button } from "../ui/button";

const Stepper = ({ children, current }) => {
  const [show, setShow] = useState(0);

  return (
    <div className="w-full min-h-[400px] flex flex-col gap-2 items-center justify-center">
      {children[show]}{" "}
      {/* <Button onClick={() => setCurrent((prev) => prev + 1)}>Next</Button> */}
    </div>
  );
};

export default Stepper;
