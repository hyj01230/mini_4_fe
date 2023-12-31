import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenFromCookie } from "../../auth/cookie";
import { serverUrl } from "../../common/common";
import Modal from "../detail/Modal";

function ContentsBox() {
  const token = getTokenFromCookie();
  const [list, setList] = useState([]);
  const { id } = useParams();
  const [opinionId, setOpinionId] = useState(0);

  const getOpinions = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/opinions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
        },
      });
      console.log("오늘의활동", response.data.data);
      setList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOpinions();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const likeHandler = async (id) => {
    console.log(id);
    try {
      axios.post(
        `${serverUrl}/api/opinion/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
          },
        }
      );
      getOpinions();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-start mt-4 mb-4 gap-9">
      {list.length !== 0 ? (
        list.map((item) => {
          return (
            <div
              key={item.opinionId}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow md:flex-col md:w-[31%]"
            >
              <div
                onClick={() => {
                  openModal();
                  setOpinionId(item.opinionId);
                }}
              >
                <img
                  className="rounded-t-lg h-40"
                  src={item.opinionImageUrl}
                  alt=""
                />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.opinionTitle}
                  </h5>

                  <p className="font-normal text-gray-700">
                    {item.opinionContent}
                  </p>
                </div>
              </div>

              <p
                onClick={() => {
                  likeHandler(item.opinionId);
                }}
                className="pb-4 px-4"
              >
                {item.likeState ? "♥" : "♡"} {item.likeCount}
              </p>
            </div>
          );
        })
      ) : (
        <p>작성된 글이 없습니다.</p>
      )}

      {isModalOpen && (
        <Modal onCloseModal={closeModal} opinionId={opinionId} id={id} />
      )}
    </div>
  );
}

export default ContentsBox;
