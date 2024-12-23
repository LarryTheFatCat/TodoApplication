import React from "react";

const PendingIcon: React.FC = (props: any) => {
  return (
    <svg
      {...props}
      viewBox="0 0 30 30"
      fill="none"
      id="Layer_1"
      version="1.1"
      className="ml-2"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n\t.st0{fill:#FD6A7E;}\n\t.st1{fill:#17B978;}\n\t.st2{fill:#8797EE;}\n\t.st3{fill:#41A6F9;}\n\t.st4{fill:#37E0FF;}\n\t.st5{fill:#2FD9B9;}\n\t.st6{fill:#F498BD;}\n\t.st7{fill:#FFDF1D;}\n\t.st8{fill:#C6C9CC;}\n",
        }}
      />
      <path
        className="st8"
        d="M15,4C8.9,4,4,8.9,4,15s4.9,11,11,11s11-4.9,11-11S21.1,4,15,4z M21.7,16.8c-0.1,0.4-0.5,0.6-0.9,0.5l-5.6-1.1  c-0.2,0-0.4-0.2-0.6-0.3C14.2,15.7,14,15.4,14,15c0,0,0,0,0,0l0.2-8c0-0.5,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8l0.1,6.9l5.2,1.8  C21.6,15.8,21.8,16.3,21.7,16.8z"
      />
    </svg>
  );
};

export default PendingIcon;