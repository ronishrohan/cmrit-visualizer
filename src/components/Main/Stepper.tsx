import { useState } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

const Stepper = ({ children, current }) => {
  const [show, setShow] = useState(current);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`slides-${current}`}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-[400px] flex flex-col gap-2 items-center justify-center"
      >
        {children[current]}
        {/* <Button onClick={() => setCurrent((prev) => prev + 1)}>Next</Button> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Stepper;
