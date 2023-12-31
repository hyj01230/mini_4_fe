import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenFromCookie } from "../auth/cookie";
import { serverUrl } from "../common/common";
import { locations, partys } from "../data/data";
import baseImg from "../img/기본프로필사진.png";

function NationalMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [link, setLink] = useState(`/${!id ? "" : id}`);

  const token = getTokenFromCookie();
  const [initData, setInitData] = useState([]);
  const [resultList, setResultList] = useState(initData);

  const [locateUrlPlus, setLocalUrlPlus] = useState("");
  const [partyUrlPlus, setPartyUrlPlus] = useState("");
  console.log(partyUrlPlus);

  async function fetchLocationData() {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/location?location=${locateUrlPlus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
          },
        }
      );
      console.log("지역별 조회", response);
      if (response.status === 200) {
        setResultList(response.data.data);
      }
    } catch (error) {
      console.error(error);

      alert(error);
    }
  }

  const followData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/following`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
        },
      });
      console.log("팔로우", response);
      if (response.status === 200) {
        setResultList(response.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const partyData = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/party?party=${partyUrlPlus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
          },
        }
      );
      console.log("정당별", response);
      if (response.status === 200) {
        setResultList(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const allData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/main`);
      console.log(response);
      if (response.status === 200) {
        setInitData(response.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (link === "/location") {
      allData();
      fetchLocationData();
    }
    if (link === "/") allData();
    if (link === "/follow") {
      // allData();
      followData();
    }
    if (link === "/party") {
      allData();
      partyData();
    }
  }, [link, locateUrlPlus, partyUrlPlus]);

  return (
    <div className="mb-20">
      <div className="mx-auto max-w-7xl px-10 sm:px-8 lg:px-[19rem] mb-10">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {link !== "/" && link !== "/follow" && (
            <li className="mr-2 mb-2">
              <button
                class="inline-block px-4 py-2 text-white bg-slate-500 rounded-lg active font-semibold"
                aria-current="page"
                onClick={() => {
                  setResultList([]);
                }}
              >
                전체
              </button>
            </li>
          )}
          {link === "/location" &&
            token &&
            locations.map((item) => {
              return (
                <li className="mr-2 mb-2">
                  <button
                    class="inline-block px-4 py-2 text-white bg-slate-500 rounded-lg active font-semibold"
                    aria-current="page"
                    onClick={() => setLocalUrlPlus(item.location)}
                  >
                    {item.location}
                  </button>
                </li>
              );
            })}
          {link === "/party" &&
            token &&
            partys.map((item) => {
              return (
                <>
                  <li className="mr-2 mb-2" key={item.id}>
                    <button
                      className="inline-block px-4 py-2 text-slate-50 rounded-lg active font-bold"
                      style={{ backgroundColor: `${item.color}` }}
                      aria-current="page"
                      onClick={() => setPartyUrlPlus(item.party)}
                    >
                      {item.party}
                    </button>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
      <section className="text-neutral-700 dark:text-neutral-300 flex justify-center flex-wrap">
        <div className="grid gap-6 text-center md:grid-cols-3">
          {/* First Testimonial */}
          {resultList.length !== 0
            ? resultList.map((item) => {
                return (
                  <div
                    className="max-w-md"
                    key={item.nickname}
                    onClick={() => {
                      navigate(`/detail/${item.userId}`);
                    }}
                  >
                    <div className="block rounded-lg bg-white shadow-lg ">
                      <div
                        className="h-28 overflow-hidden rounded-t-lg"
                        style={{
                          backgroundColor: `${
                            partys.find((x) => x.party === item.party)?.color
                          }`,
                        }}
                      ></div>
                      <div className="mx-auto -mt-12 w-24 h-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800  flex justify-center items-center">
                        <img
                          src={item.imageUrl ? item.imageUrl : baseImg}
                          alt="Avatar 1"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="mb-4 text-2xl font-semibold">{`${item.nickname} / ${item.location}`}</h4>
                        <hr />
                        <p className="mt-4 text-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={partys.find((x) => {
                              return x.party === item.party
                                ? x.color
                                : undefined;
                            })}
                            className="inline-block h-5 w-5 pr-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.380 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.380 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                          </svg>
                          {item.opinionTitle === "" ||
                          item.opinionTitle === null
                            ? `안녕하세요`
                            : item.opinionTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : initData.map((item) => {
                return (
                  <div
                    className="max-w-md"
                    key={item.nickname}
                    onClick={() => {
                      navigate(`/detail/${item.userId}`);
                    }}
                  >
                    <div className="block rounded-lg bg-white shadow-lg ">
                      <div
                        className="h-28 overflow-hidden rounded-t-lg"
                        style={{
                          backgroundColor: `${
                            partys.find((x) => x.party === item.party)?.color
                          }`,
                        }}
                      ></div>
                      <div className="mx-auto -mt-12 w-24 h-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800  flex justify-center items-center">
                        <img
                          src={item.imageUrl ? item.imageUrl : baseImg}
                          alt="Avatar 1"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="mb-4 text-2xl font-semibold">{`${item.nickname} / ${item.location}`}</h4>
                        <hr />
                        <p className="mt-4 text-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={partys.find((x) => {
                              return x.party === item.party
                                ? x.color
                                : undefined;
                            })}
                            className="inline-block h-5 w-5 pr-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.380 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.380 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                          </svg>
                          {item.opinionTitle === "" ||
                          item.opinionTitle === null
                            ? `안녕하세요`
                            : item.opinionTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </div>
  );
}

export default NationalMember;
