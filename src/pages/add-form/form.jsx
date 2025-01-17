import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const AddForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const type = queryParams.get("type");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alluserComponents, setAllUserComponents] = useState([]);
  const [formType, setFormType] = useState(type || "AllEvents");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) {
        setAllUserComponents((prev) => [
          ...prev,
          {
            type: "Text",
            inputName: "Email",
            inputNamePlaceholder: "Enter your email",
            currentId: 29891.74452652699,
            placeholder: "Enter your email",
          },
        ]);
        return alert("No Events Registered");
      }
      try {
        const { data: axres } = await axios.get(
          `https://server-admin-nxtup-r754.onrender.com/api/events?id=${id}`,
          { headers: { "ngrok-skip-browser-warning": "69420" } }
        );
        setAllUserComponents(axres["data"][0]?.Form?.sequence || []);
        setTitle(axres["data"][0].Title);
        setDesc(axres["data"][0].Description);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    })();
  }, [id, formType]);

  function deleteInput(id) {
    setAllUserComponents((prev) => prev.filter((el) => el.currentId !== id));
  }

  function moveComponentUp(index) {
    setAllUserComponents((prev) => {
      if (index === 0) return prev; // Can't move the first item up
      const newComponents = [...prev];
      [newComponents[index - 1], newComponents[index]] = [
        newComponents[index],
        newComponents[index - 1],
      ];
      return newComponents;
    });
  }

  function moveComponentDown(index) {
    setAllUserComponents((prev) => {
      if (index === prev.length - 1) return prev; // Can't move the last item down
      const newComponents = [...prev];
      [newComponents[index + 1], newComponents[index]] = [
        newComponents[index],
        newComponents[index + 1],
      ];
      return newComponents;
    });
  }

  async function submitRegisterForm() {
    setLoading(true);
    try {
      if (alluserComponents && alluserComponents[0]) {
        const { data: axres } = await axios.post(
          `https://server-admin-nxtup-r754.onrender.com/addForm`,
          {
            id,
            title,
            description: desc,
            Form: { sequence: alluserComponents },
          }
        );
        if (axres.status) {
          toast.success(axres.message);
          navigate("/home");
        } else {
          toast.success(axres.message);
        }
      } else {
        toast.success("Please Add Any Input");
      }
    } catch (error) {
      toast.success(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // console.log(JSON.stringify(alluserComponents));
  return (
    <div className="flex justify-center text-white bg-black">
      <div className="p-[1rem] flex flex-col items-center">
        <h3
          className="px-[1rem] font-bold text-3xl"
          style={{ fontFamily: "Outfit" }}
        >
          Registration form
        </h3>
        <div className="p-[1rem] flex flex-col gap-[0.5rem] mr-[1.2rem]">
          <h3>Your Event Name</h3>
          <div className="relative">
            <input
              type="text"
              name="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              disabled
              className="w-[26rem] text-white text-black px-[1rem] py-[0.5rem] rounded-md"
              placeholder="Damru"
            />
            <div className="absolute right-[0.8rem] top-1/2 translate-y-[-50%] pointer-events-none">
              <img src="/edit-text.png" alt="" className="w-[1.3rem] " />
            </div>
          </div>
        </div>
        <div className="p-[1rem] flex flex-col gap-[0.5rem] mr-[1.2rem]">
          <h3>
            {formType == "AllActivities" ? "Activity" : "Event"} description
          </h3>
          <div className="relative">
            <input
              type="text"
              name="Description"
              value={desc}
              disabled
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="w-[26rem] text-white px-[1rem] py-[0.5rem] rounded-md text-black"
              placeholder="NST-RU cultural fest"
            />
            <div className="absolute right-[0.8rem] top-1/2 translate-y-[-50%] pointer-events-none">
              <img src="/edit-text.png" alt="" className="w-[1.3rem] " />
            </div>
          </div>
        </div>

        <div className="p-[1rem] w-[30rem] flex flex-col items-center">
          <h3 className="pb-[1rem] font-semibold">Add inputs for user</h3>
          <div
            className={`/px-[1rem] ${
              alluserComponents[0] ? "mb-[1.5rem]" : ""
            } flex flex-col gap-[0.8rem]`}
          >
            {alluserComponents.map((el, index) => {
              if (el.type == "text") {
                return (
                  <>
                    <div className="flex gap-[0.5rem] w-max items-center">
                      <div className="flex flex-col gap-[0.2rem]">
                        <button
                          onClick={() => moveComponentUp(index)}
                          disabled={index === 0}
                        >
                          <img
                            style={{
                              rotate: "180deg",
                              filter: "invert(1)",
                              width: "2rem",
                            }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => moveComponentDown(index)}
                          disabled={index === alluserComponents.length - 1}
                        >
                          <img
                            style={{ filter: "invert(1)", width: "2rem" }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex flex-col gap-[0.5rem]">
                        <input
                          type="text"
                          value={el?.inputName || ""}
                          placeholder={el?.inputNamePlaceholder}
                          onChange={(curel) => {
                            setAllUserComponents((prev) =>
                              prev.map((ell) =>
                                ell.currentId == el.currentId
                                  ? { ...ell, inputName: curel.target.value }
                                  : ell
                              )
                            );
                          }}
                          className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-transparent"
                        />
                        <div className="flex gap-[0.5rem] justify-center items-center w-[30rem]">
                          <div className="flex gap-[0.5rem]">
                            <textarea
                              type="text"
                              value={el?.placeholder || ""}
                              onChange={(curel) => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? {
                                          ...ell,
                                          placeholder:
                                            curel.target.value.includes(",")
                                              ? curel.target.value.split(",")
                                              : [curel.target.value],
                                        }
                                      : ell
                                  )
                                );
                              }}
                              className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                              placeholder="Input placeholder value"
                            />
                          </div>
                          <div
                            onClick={() => deleteInput(el?.currentId)}
                            className="/bg-red-700 hover:scale-110 cursor-pointer rounded-full /w-[3rem] flex items-center justify-center /h-[3rem] p-[0.5rem] transition-all duration-200"
                          >
                            <img
                              src="/assets/bin.png"
                              className="w-[2.5rem] /mb-[0.2rem]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-[0.5rem] items-center">
                          <div className="flex items-center gap-[0.5rem]">
                            <input
                              type="checkbox"
                              checked={el?.required || false}
                              onChange={() => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? { ...ell, required: !ell.required }
                                      : ell
                                  )
                                );
                              }}
                            />
                            <label className="text-white">Required</label>
                          </div>
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <div className="text-green-400 text-sm">
                            {el.type[0].toUpperCase() +
                              el.type.split("").splice(1).join("") +
                              " input"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } else if (el.type == "radio") {
                return (
                  <>
                    <div className="flex gap-[0.5rem] w-max items-center">
                      <div className="flex flex-col gap-[0.2rem]">
                        <button
                          onClick={() => moveComponentUp(index)}
                          disabled={index === 0}
                        >
                          <img
                            style={{
                              rotate: "180deg",
                              filter: "invert(1)",
                              width: "2rem",
                            }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => moveComponentDown(index)}
                          disabled={index === alluserComponents.length - 1}
                        >
                          <img
                            style={{ filter: "invert(1)", width: "2rem" }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex flex-col gap-[0.5rem]">
                        <input
                          type="text"
                          value={el?.inputName || ""}
                          placeholder={el?.inputNamePlaceholder}
                          onChange={(curel) => {
                            setAllUserComponents((prev) =>
                              prev.map((ell) =>
                                ell.currentId == el.currentId
                                  ? { ...ell, inputName: curel.target.value }
                                  : ell
                              )
                            );
                          }}
                          className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-transparent"
                        />
                        <div className="flex gap-[0.5rem] justify-center items-center w-[30rem]">
                          <div className="flex gap-[0.5rem]">
                            <textarea
                              type="text"
                              value={el?.placeholder || ""}
                              onChange={(curel) => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? {
                                          ...ell,
                                          placeholder:
                                            curel.target.value.includes(",")
                                              ? curel.target.value.split(",")
                                              : [curel.target.value],
                                        }
                                      : ell
                                  )
                                );
                              }}
                              className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                              placeholder="Radio Option values (',' separated values)"
                            />
                          </div>
                          <div
                            onClick={() => deleteInput(el?.currentId)}
                            className="/bg-red-700 hover:scale-110 cursor-pointer rounded-full /w-[3rem] flex items-center justify-center /h-[3rem] p-[0.5rem] transition-all duration-200"
                          >
                            <img
                              src="/assets/bin.png"
                              className="w-[2.5rem] /mb-[0.2rem]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-[0.5rem] items-center">
                          <div className="flex items-center gap-[0.5rem]">
                            <input
                              type="checkbox"
                              checked={el?.required || false}
                              onChange={() => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? { ...ell, required: !ell.required }
                                      : ell
                                  )
                                );
                              }}
                            />
                            <label className="text-white">Required</label>
                          </div>
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <div className="text-green-400 text-sm">
                            {el.type[0].toUpperCase() +
                              el.type.split("").splice(1).join("") +
                              " input"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } else if (el.type == "select") {
                return (
                  <>
                    <div className="flex gap-[0.5rem] w-max items-center">
                      <div className="flex flex-col gap-[0.2rem]">
                        <button
                          onClick={() => moveComponentUp(index)}
                          disabled={index === 0}
                        >
                          <img
                            style={{
                              rotate: "180deg",
                              filter: "invert(1)",
                              width: "2rem",
                            }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => moveComponentDown(index)}
                          disabled={index === alluserComponents.length - 1}
                        >
                          <img
                            style={{ filter: "invert(1)", width: "2rem" }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex flex-col gap-[0.5rem]">
                        <input
                          type="text"
                          value={el?.inputName || ""}
                          placeholder={el?.inputNamePlaceholder}
                          onChange={(curel) => {
                            setAllUserComponents((prev) =>
                              prev.map((ell) =>
                                ell.currentId == el.currentId
                                  ? {
                                      ...ell,
                                      inputName: curel.target.value,
                                    }
                                  : ell
                              )
                            );
                          }}
                          className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-transparent"
                        />
                        <div className="flex gap-[0.5rem] justify-center items-center w-[30rem]">
                          <div className="flex gap-[0.5rem]">
                            <textarea
                              type="text"
                              value={el?.placeholder || ""}
                              onChange={(curel) => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? {
                                          ...ell,
                                          placeholder:
                                            curel.target.value.includes(",")
                                              ? curel.target.value.split(",")
                                              : [curel.target.value],
                                        }
                                      : ell
                                  )
                                );
                              }}
                              className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                              placeholder="Option values (',' separated values)"
                            />
                          </div>
                          <div
                            onClick={() => deleteInput(el?.currentId)}
                            className="/bg-red-700 hover:scale-110 cursor-pointer rounded-full /w-[3rem] flex items-center justify-center /h-[3rem] p-[0.5rem] transition-all duration-200"
                          >
                            <img
                              src="/assets/bin.png"
                              className="w-[2.5rem] /mb-[0.2rem]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-[0.5rem] items-center">
                          <div className="flex items-center gap-[0.5rem]">
                            <input
                              type="checkbox"
                              checked={el?.required || false}
                              onChange={() => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? { ...ell, required: !ell.required }
                                      : ell
                                  )
                                );
                              }}
                            />
                            <label className="text-white">Required</label>
                          </div>
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <div className="text-green-400 text-sm">
                            {el.type[0].toUpperCase() +
                              el.type.split("").splice(1).join("") +
                              " input"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } else if (el.type == "checkbox") {
                return (
                  <>
                    <div className="flex gap-[0.5rem] w-max items-center">
                      <div className="flex flex-col gap-[0.2rem]">
                        <button
                          onClick={() => moveComponentUp(index)}
                          disabled={index === 0}
                        >
                          <img
                            style={{
                              rotate: "180deg",
                              filter: "invert(1)",
                              width: "2rem",
                            }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => moveComponentDown(index)}
                          disabled={index === alluserComponents.length - 1}
                        >
                          <img
                            style={{ filter: "invert(1)", width: "2rem" }}
                            src="/assets/down-arrow.png"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex flex-col gap-[0.5rem]">
                        <input
                          type="text"
                          value={el?.inputName || ""}
                          placeholder={el?.inputNamePlaceholder}
                          onChange={(curel) => {
                            setAllUserComponents((prev) =>
                              prev.map((ell) =>
                                ell.currentId == el.currentId
                                  ? {
                                      ...ell,
                                      inputName: curel.target.value,
                                    }
                                  : ell
                              )
                            );
                          }}
                          className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-transparent"
                        />
                        <div className="flex gap-[0.5rem] justify-center items-center w-[30rem]">
                          <div className="flex gap-[0.5rem]">
                            <textarea
                              type="text"
                              value={el?.placeholder || ""}
                              onChange={(curel) => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? {
                                          ...ell,
                                          placeholder:
                                            curel.target.value.includes(",")
                                              ? curel.target.value.split(",")
                                              : [curel.target.value],
                                        }
                                      : ell
                                  )
                                );
                              }}
                              className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                              placeholder="Option values (',' separated values)"
                            />
                          </div>
                          <div
                            onClick={() => deleteInput(el?.currentId)}
                            className="/bg-red-700 hover:scale-110 cursor-pointer rounded-full /w-[3rem] flex items-center justify-center /h-[3rem] p-[0.5rem] transition-all duration-200"
                          >
                            <img
                              src="/assets/bin.png"
                              className="w-[2.5rem] /mb-[0.2rem]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-[0.5rem] items-center">
                          <div className="flex items-center gap-[0.5rem]">
                            <input
                              type="checkbox"
                              checked={el?.required || false}
                              onChange={() => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? { ...ell, required: !ell.required }
                                      : ell
                                  )
                                );
                              }}
                            />
                            <label className="text-white">Required</label>
                          </div>
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <div className="text-green-400 text-sm">
                            {el.type[0].toUpperCase() +
                              el.type.split("").splice(1).join("") +
                              " input"}
                          </div>
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <div className="flex gap-[0.5rem] items-center">
                            <div className="text-green-400 text-sm">Max:</div>
                            <input
                              type="text"
                              value={el?.maxValue || ""}
                              onChange={(curel) => {
                                setAllUserComponents((prev) =>
                                  prev.map((ell) =>
                                    ell.currentId == el.currentId
                                      ? {
                                          ...ell,
                                          maxValue: curel.target.value,
                                        }
                                      : ell
                                  )
                                );
                              }}
                              className="w-[1.7rem] h-[1rem] text-black p-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="flex gap-[0.5rem] w-max items-center">
                    <div className="flex flex-col gap-[0.2rem]">
                      <button
                        onClick={() => moveComponentUp(index)}
                        disabled={index === 0}
                      >
                        <img
                          style={{
                            rotate: "180deg",
                            filter: "invert(1)",
                            width: "2rem",
                          }}
                          src="/assets/down-arrow.png"
                          alt=""
                        />
                      </button>
                      <button
                        onClick={() => moveComponentDown(index)}
                        disabled={index === alluserComponents.length - 1}
                      >
                        <img
                          style={{ filter: "invert(1)", width: "2rem" }}
                          src="/assets/down-arrow.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <div className="flex flex-col gap-[0.5rem]">
                      <input
                        type={"text"}
                        value={el?.inputName || ""}
                        placeholder={el?.inputNamePlaceholder}
                        onChange={(curel) => {
                          setAllUserComponents((prev) =>
                            prev.map((ell) =>
                              ell.currentId == el.currentId
                                ? { ...ell, inputName: curel.target.value }
                                : ell
                            )
                          );
                        }}
                        className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-transparent"
                      />
                      <div className="flex gap-[0.5rem] justify-center items-center w-[30rem]">
                        <div className="flex gap-[0.5rem]">
                          <input
                            type={"text"}
                            value={el?.placeholder || ""}
                            onChange={(curel) => {
                              setAllUserComponents((prev) =>
                                prev.map((ell) =>
                                  ell.currentId == el.currentId
                                    ? {
                                        ...ell,
                                        placeholder:
                                          curel.target.value.includes(",")
                                            ? curel.target.value.split(",")
                                            : [curel.target.value],
                                      }
                                    : ell
                                )
                              );
                            }}
                            className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                            placeholder="Input Placeholder Value"
                          />
                        </div>
                        <div
                          onClick={() => deleteInput(el?.currentId)}
                          className="/bg-red-700 hover:scale-110 cursor-pointer rounded-full /w-[3rem] flex items-center justify-center /h-[3rem] p-[0.5rem] transition-all duration-200"
                        >
                          <img
                            src="/assets/bin.png"
                            className="w-[2.5rem] /mb-[0.2rem]"
                          />
                        </div>
                      </div>
                      <div className="flex gap-[0.5rem] items-center">
                        <div className="flex items-center gap-[0.5rem]">
                          <input
                            type="checkbox"
                            checked={el?.required || false}
                            onChange={() => {
                              setAllUserComponents((prev) =>
                                prev.map((ell) =>
                                  ell.currentId == el.currentId
                                    ? { ...ell, required: !ell.required }
                                    : ell
                                )
                              );
                            }}
                          />
                          <label className="text-white">Required</label>
                        </div>
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <div className="text-green-400 text-sm">
                          {el.type[0].toUpperCase() +
                            el.type.split("").splice(1).join("") +
                            " input"}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="relative w-[26rem]">
            <button
              onClick={(el) => {
                if (
                  el.currentTarget.parentElement.nextElementSibling.style
                    .opacity == 1
                ) {
                  el.currentTarget.nextElementSibling.style.transform =
                    "translateY(-50%) rotate(0deg)";

                  el.currentTarget.parentElement.nextElementSibling.nextElementSibling.style.height =
                    "0px";
                  el.currentTarget.parentElement.nextElementSibling.style.opacity = 0;
                } else {
                  el.currentTarget.nextElementSibling.style.transform =
                    "translateY(-50%) rotate(180deg)";
                  el.currentTarget.parentElement.nextElementSibling.nextElementSibling.style.height =
                    "452.750px";
                  el.currentTarget.parentElement.nextElementSibling.style.opacity = 1;
                }
              }}
              className="px-[1rem] py-[0.8rem] w-[26rem] bg-slate-900  rounded-tl-md rounded-tr-md cursor-pointer text-white"
            >
              + Add input
            </button>
            <div className="absolute top-1/2 right-[1.1rem] -translate-y-1/2 invert transition-all duration-300 pointer-events-none">
              <img className="w-[1.2rem]" src="/caret-down.png" alt="" />
            </div>
          </div>
          <div className="w-[26rem] opacity-0 transition-all duration-200 h-[2px] bg-slate-800" />
          <div className="flex text-white flex-col gap-[0.5rem] h-0 overflow-hidden bg-slate-900 w-[26rem] rounded-bl-md rounded-br-md transition-all duration-300">
            {[
              {
                type: "text",
                inputName: "",
                inputNamePlaceholder: "Example Text input title (Editable)",
                // placeholder: "Text Placeholder (Editable)",
                currentId: Math.random() * 99999,
              },
              {
                type: "email",
                inputName: "",
                inputNamePlaceholder: "Email input title (Editable)",
                // placeholder: "Checkbox option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
              {
                type: "number",
                inputName: "",
                inputNamePlaceholder: "number input title (Editable)",
                // placeholder: "Checkbox option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
              {
                type: "radio",
                inputName: "",
                inputNamePlaceholder: "Example Radio input title (Editable)",
                currentId: Math.random() * 99999,
              },
              {
                type: "select",
                inputName: "",
                inputNamePlaceholder: "Example Select input title (Editable)",
                // placeholder: "Select option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
              {
                type: "checkbox",
                inputName: "",
                inputNamePlaceholder: "Example Checkbox input title (Editable)",
                // placeholder: "Checkbox option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
              {
                type: "textarea",
                inputName: "",
                inputNamePlaceholder: "Example TextArea input title (Editable)",
                // placeholder: "Checkbox option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
              {
                type: "link",
                inputName: "",
                inputNamePlaceholder: "Example link input title (Editable)",
                // placeholder: "Checkbox option values (',' seperated values)",
                currentId: Math.random() * 99999,
              },
            ].map((el) => (
              <div
                key={Math.floor(Math.random() * 999) + el.type}
                onClick={() => {
                  setAllUserComponents((prev) => [...prev, { ...el }]);
                }}
                className="text-center py-[0.8rem] px-[1rem] hover:bg-slate-800 transition-all duration-200 cursor-pointer"
              >
                {el.type[0].toUpperCase() +
                  el.type.split("").splice(1).join("")}
              </div>
            ))}
          </div>
          <button
            className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[26rem] rounded-tl-md rounded-tr-md cursor-pointer mt-[1rem]"
            onClick={submitRegisterForm}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[26rem] rounded-tl-md rounded-tr-md cursor-pointer mt-[1rem]"
            onClick={() => navigate("/home")}
          >
            Skip This step
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
