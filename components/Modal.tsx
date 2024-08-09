import { Children } from "react";
import { Button } from "./ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  margin: string;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, margin }) => {
  return (
    <div
      className={`absolute inset-0 h-screen rounded-lg border transition-colors ${open ? "visible bg-slate-950/50" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className={`mx-auto ${margin} h-fit max-w-lg rounded-lg bg-white shadow transition-all ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-0 top-4">
          <Button
            variant="ghost"
            className="mx-1 h-7 w-7 px-1"
            size="icon"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                fill="#D9D9D9"
              ></path>
            </svg>
          </Button>
        </div>
        {children}
        <div className="grid grid-cols-2 gap-3 p-5">
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button variant="default" className="rounded-full">
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
