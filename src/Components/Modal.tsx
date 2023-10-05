import { useState } from "react";
import { ConfigProps } from "../types/pomodoro_config";
import Circle from "./Circle";

interface ModalProps {
  config: ConfigProps;
  onClickChangeConfig: (config: ConfigProps) => void;
}

const Modal: React.FC<ModalProps> = ({ config, onClickChangeConfig }: ModalProps) => {
  const [newConfig, setNewConfig] = useState<ConfigProps>(config);

  function OnChangeInput(event: React.ChangeEvent<HTMLInputElement>, entryName: string) {
    setNewConfig((prevConfig) => ({ ...prevConfig, [entryName]: parseInt(event.target.value) }));
  }

  function OnClickFont(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    let newFont = event.currentTarget.querySelector("input");
    if (newFont) {
      setNewConfig((prevConfig) => ({ ...prevConfig, font: newFont!.value }));
    }
  }
  function CheckCircleColor(font: string) {
    return newConfig.font === font ? "blue" : "input_color";
  }
  function CheckCircleTextColor(font: string) {
    return newConfig.font === font ? "text-white" : "text-blue";
  }

  function OnClickColor(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    let newColor = event.currentTarget.querySelector("input");
    if (newColor) {
      setNewConfig((prevConfig) => ({ ...prevConfig, color: newColor!.value }));
    }
  }

  return (
    /* Modal Wrapper */
    <div className="w-screen h-screen flex flex-row justify-center items-center absolute top-0">
      {/* Overlay */}
      <div className="w-full h-full bg-black opacity-40 absolute top-0"></div>
      {/* Modal Container */}
      <div className="bg-white w-[530px] h-[500px] absolute top-[17%] rounded-3xl border z-20">
        {/* Modal Header (Settings) */}
        <div className="border-b border-zinc-200 flex flex-row justify-between items-center px-8 py-6">
          <p className="text-[28px] text-blue">Settings</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer text-dark_text"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        {/* Time */}
        <div className="modal-time mx-9 py-6 border-b border-zinc-200">
          <p className="uppercase text-blue tracking-[5px] text-sm">Time (Minutes)</p>
          <div className="selection-row flex flex-row justify-between items-center">
            <div className="selection text-xs font-bold mt-4">
              <p className="text-light_text">pomodoro</p>
              <input
                type="number"
                defaultValue={newConfig.pomodoro}
                onChange={(e) => OnChangeInput(e, "pomodoro")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>

            <div className="selection text-xs font-bold mt-4">
              <p className="text-light_text">short break</p>
              <input
                type="number"
                defaultValue={newConfig.short}
                onChange={(e) => OnChangeInput(e, "short")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>

            <div className="selection text-xs font-bold mt-4">
              <p className="text-light_text">long break</p>
              <input
                type="number"
                defaultValue={newConfig.long}
                onChange={(e) => OnChangeInput(e, "long")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>
          </div>
        </div>
        {/* Font */}
        <div className="flex flex-row justify-between items-center mx-9 py-6 border-b border-zinc-200">
          <p className="text-sm uppercase tracking-[5px]">Font</p>
          <div className="flex flex-row justify-start items-center gap-4">
            <Circle
              color={CheckCircleColor("kumbh")}
              name="font"
              value="kumbh"
              className="hover:bg-blue hover:text-white"
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("kumbh")} group-hover:text-white font-kumbh`}>Aa</p>
            </Circle>
            <Circle
              color={CheckCircleColor("roboto_slab")}
              name="font"
              value="roboto_slab"
              className={`hover:bg-blue `}
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("roboto_slab")} group-hover:text-white font-roboto_slab`}>Aa</p>
            </Circle>
            <Circle
              color={CheckCircleColor("space_mono")}
              name="font"
              value="space_mono"
              className="hover:bg-blue"
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("space_mono")} group-hover:text-white font-space_mono`}>Aa</p>
            </Circle>
          </div>
        </div>
        {/* Color */}
        <div className="flex flex-row justify-between items-center mx-9 py-6">
          <p className="text-sm uppercase tracking-[5px]">Color</p>
          <div className="flex flex-row justify-start items-center gap-4">
            <Circle color="accent_red" onClick={OnClickColor} name="color" value="red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "red" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>

            <Circle color="accent_cyan" onClick={OnClickColor} name="color" value="cyan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "cyan" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>

            <Circle color="accent_purple" onClick={OnClickColor} name="color" value="purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "purple" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>
          </div>
        </div>
        <button
          className="text-white bg-accent_red rounded-full px-12 py-4 absolute -bottom-7 left-[50%] -translate-x-[50%] hover:scale-110 duration-200"
          onClick={() => onClickChangeConfig(newConfig)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Modal;
