import React, { MouseEventHandler, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

type DrawerMenuProps = {
  href?: string;
  children?: React.ReactNode;
  text: React.ReactNode | JSX.Element;
  icon?: React.ReactNode | JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const DrawerMenu = ({
  text,
  icon,
  onClick,
  children,
  href = "#",
  ...rest
}: DrawerMenuProps) => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const Icon = () => (
    <div className="flex items-center justify-center min-w-[30px] min-h-[30px] mr-4 text-[1.375rem]">
      {icon}
    </div>
  );

  const onClickHandler = (ev: any) => {
    if (children) {
      // Toggle the open state when the item has children
      setOpen(!open);
    } else {
      // If there's an onClick handler provided, use it; otherwise, navigate to the href
      if (onClick && typeof onClick === "function") {
        onClick(ev);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      <button
        className={
          "flex flex-row p-2 justify-between items-center hover:bg-[#ffffff29] focus:bg-[#ffffff19] focus:border-l-2 focus:border-[#ffffff99]"
        }
        onClick={onClickHandler}
        title={href}
        {...rest}
      >
        <div className={"flex flex-row items-center mr-4 font-medium"}>
          <Icon />
          <span className="text-left text-sm">{text}</span>
        </div>

        {children && (
          <span className="p-1 rounded-full text-xl">
            {open ? <MdExpandLess /> : <MdExpandMore />}
          </span>
        )}
      </button>
      {open && children}
    </>
  );
};

export default DrawerMenu;
